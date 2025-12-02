// ----------------------------------------------------------------------------------------
//	Function:	mappView explorer
// ----------------------------------------------------------------------------------------

PROGRAM _INIT
	// ----------------------------------------------------------------------------------------
	// Copy pre-configured devices into list
	brsmemcpy(ADR(EXPL.PAR[0].device_list), ADR(EXPL_DEVICE_LIST), SIZEOF(EXPL_DEVICE_LIST));
	brsmemcpy(ADR(EXPL.PAR[1].device_list), ADR(EXPL_DEVICE_LIST), SIZEOF(EXPL_DEVICE_LIST));
	brsstrcpy(ADR(EXPL.PAR[0].device_active), ADR(EXPL.PAR[0].device_list[0]));
	brsstrcpy(ADR(EXPL.PAR[1].device_active), ADR(EXPL.PAR[1].device_list[0]));
	
	// ----------------------------------------------------------------------------------------
	// Connect to user device for temporary files used with download all
	REPEAT
		DevLink_0.enable := 1;
		DevLink_0.pDevice := ADR('TMP_USER');  
		DevLink_0.pParam := ADR('/DEVICE=F:');  
		DevLink_0;
		UNTIL DevLink_0.status <> ERR_FUB_BUSY
	END_REPEAT;
END_PROGRAM

PROGRAM _CYCLIC
	
	// ------------------------------------------------------------------------------------------------
	// Set switches for HMI, these buttons are enabled if there is at least one file or directory
	IF(EXPL.DAT[side].item_num > 0) THEN
		EXPL.VIS[side].enable_button_set_1 := TRUE;
	ELSE
		EXPL.VIS[side].enable_button_set_1 := FALSE;
	END_IF

	// ------------------------------------------------------------------------------------------------
	// Generate device name list for drop down box
	brsmemset(ADR(EXPL.VIS[side].device_list), 0, SIZEOF(EXPL.VIS[side].device_list));
	FOR lx := 0 TO SIZEOF(EXPL.VIS[side].device_list)/SIZEOF(EXPL.VIS[side].device_list[0]) - 1 DO
		IF (EXPL.PAR[side].device_list[lx] <> '') THEN
			String2DataProvider(ADR(EXPL.PAR[side].device_list[lx]), ADR(EXPL.VIS[side].device_list[lx]));
		END_IF
	END_FOR;

	// ------------------------------------------------------------------------------------------------
	// Handle double click for directory change and file view
	IF(EXPL.VIS[side].double_click_event > 0) THEN
		double_click_timer.PT := 50;
		double_click_timer.IN := TRUE;
		double_click_timer();
		IF(EXPL.VIS[side].double_click_event > 1) THEN
			double_click_timer.IN := FALSE;
			double_click_timer();
			EXPL.VIS[side].double_click_event := 0;
			IF(brsmemcmp(ADR(EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected]), ADR('(DIR)'), 5) = 0 OR EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected] = '..') THEN
				EXPL.CMD[side].dir_change := TRUE;
			ELSE
				EXPL.CMD[side].view_file := TRUE;
			END_IF
		END_IF
	END_IF
	IF(double_click_timer.Q) THEN
		double_click_timer.IN := FALSE;
		double_click_timer();
		IF(EXPL.VIS[side].double_click_event > 0) THEN
			EXPL.VIS[side].double_click_event := EXPL.VIS[side].double_click_event - 1;
		END_IF
	END_IF

	//--------------------------------------------------------------------------------------------------
	// Check if parameters are valid
	IF (EXPL.PAR[side].device_active = '') THEN
		step := CreateError(ERR_DEVICE_UNDEFINED, side, step, 'device is not defined', ADR(EXPL));
		RETURN;
	END_IF
	IF (brsstrlen(ADR(EXPL.PAR[side].dir_path)) >= EXPL_DIR_PATH_LENGTH) THEN
		step := CreateError(ERR_PATH_CRITICAL, side, step, 'directory path critical error', ADR(EXPL));
		RETURN;
	END_IF

	// ------------------------------------------------------------------------------------------------
	// Track filter change
	IF (FILTER_AUTO_REFRESH AND brsstrcmp(ADR(old_filter[side]), ADR(EXPL.PAR[side].item_filter)) <> 0) THEN
		brsstrcpy(ADR(old_filter[side]), ADR(EXPL.PAR[side].item_filter));
		EXPL.CMD[side].refresh	:= TRUE;
	END_IF

	// ------------------------------------------------------------------------------------------------
	// Track device name change
	IF(device_active_old[side] <> EXPL.PAR[side].device_active) THEN
		EXPL.PAR[side].dir_path := '';
		EXPL.CMD[side].refresh	:= TRUE;
	END_IF
	device_active_old[side] := EXPL.PAR[side].device_active;

	// ------------------------------------------------------------------------------------------------
	// Stop here if no command is set
	IF (EXPL.CMD[side].refresh = FALSE AND EXPL.CMD[side].dir_change = FALSE AND EXPL.CMD[side].dir_create = FALSE AND EXPL.CMD[side].copy = FALSE AND EXPL.CMD[side].copy_all = FALSE AND EXPL.CMD[side].delete = FALSE AND EXPL.CMD[side].rename = FALSE AND EXPL.CMD[side].view_file = FALSE AND EXPL.CMD[side].download = FALSE AND EXPL.CMD[side].upload = FALSE) THEN
		// --------------------------------------------------------------------------------------------
		// Show current state
		EXPL.status_text := 'Waiting...';
		// --------------------------------------------------------------------------------------------
		// If selection is out of range set it to maximum
		IF ((EXPL.VIS[side].item_selected > EXPL.DAT[side].item_num - 1) AND (EXPL.DAT[side].item_num <> 0)) THEN
			EXPL.VIS[side].item_selected := EXPL.DAT[side].item_num - 1;
		END_IF
		side := NOT side;
		// Enable buttons when command is active
		EXPL.VIS[0].enable_button_set_2 := TRUE;
		EXPL.VIS[1].enable_button_set_2 := TRUE;
		// Reset busy status
		IF (EXPL.ERR.state = 0) AND (EXPL.status_no = ERR_FUB_BUSY) THEN
			EXPL.status_no := 0;
		END_IF
		RETURN;
	END_IF
	
	// Disable buttons when command is active
	EXPL.VIS[0].enable_button_set_1 := FALSE;
	EXPL.VIS[1].enable_button_set_1 := FALSE;
	EXPL.VIS[0].enable_button_set_2 := FALSE;
	EXPL.VIS[1].enable_button_set_2 := FALSE;
	
	// Clear errors on new command
	brsmemset(ADR(EXPL.ERR), 0, SIZEOF(EXPL.ERR));
	
	//**************************************************************************************************
	// Cyclic Part
	//**************************************************************************************************
	CASE step OF
		//**********************************************************************************************
		// Wait for command
		//**********************************************************************************************
		EXP_WAIT:
			// ----------------------------------------------------------------------------------------
			// Refresh direcrory information
			IF (EXPL.CMD[side].refresh = TRUE) THEN
				step := EXP_READ_DIR;
			END_IF
			// ----------------------------------------------------------------------------------------
			// Change active directory
			IF (EXPL.CMD[side].dir_change = TRUE) THEN
				// ------------------------------------------------------------------------------------
				// Check if directory name is empty
				IF (EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected] = '') THEN
					step := CreateError(ERR_EMPTY_ITEM, side, step, 'directory name is empty', ADR(EXPL));
					// Check if directory name is valid
				ELSIF((brsmemcmp(ADR(EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected]), ADR('(DIR)'), 5) <> 0) AND (EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected] <> '..'))  THEN
					step := CreateError(ERR_INVALID_ITEM_NAME, side, step, 'this is not a valid directory name', ADR(EXPL));
					// Check if new directory name fits into string
				ELSIF(brsstrlen(ADR(EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected])) - 5 + brsstrlen(ADR(EXPL.PAR[side].dir_path)) + 1 >= EXPL_DIR_PATH_LENGTH) THEN
					step := CreateError(ERR_PATH_EXCEEDS_MAX, side, step, 'directory path exceeds maximum length', ADR(EXPL));
				ELSE
					step := EXP_DIR_CHANGE;
				END_IF
			END_IF
			// ----------------------------------------------------------------------------------------
			// Create a new directory
			IF (EXPL.CMD[side].dir_create = TRUE) THEN
				// ------------------------------------------------------------------------------------
				// Check if new directory name is empty
				IF (EXPL.PAR[side].new_name = '') THEN
					step := CreateError(ERR_EMPTY_ITEM, side, step, 'directory name is empty', ADR(EXPL));
					// Check if new directory name fits into path string
				ELSIF(brsstrlen(ADR(EXPL.PAR[side].new_name)) + brsstrlen(ADR(EXPL.PAR[side].dir_path)) + 1 >= EXPL_DIR_PATH_LENGTH) THEN
					step := CreateError(ERR_PATH_EXCEEDS_MAX, side, step, 'directory path name exceeds maximum length', ADR(EXPL));
					// Check if new directory name fits into directory name string
				ELSIF(brsstrlen(ADR(EXPL.PAR[side].new_name)) + 5 >= EXPL_ITEM_LENGTH) THEN
					step := CreateError(ERR_DIR_EXCEEDS_MAX, side, step, 'directory name exceeds maximum length', ADR(EXPL));
				ELSE
					step := EXP_DIR_CREATE;
				END_IF
			END_IF
			// ----------------------------------------------------------------------------------------
			// Copy one file
			IF (EXPL.CMD[side].copy = TRUE) THEN
				// ------------------------------------------------------------------------------------
				// Make sure that user chooses a valid item
				IF (EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected] = '..') THEN
					step := CreateError(ERR_INVALID_ITEM_NAME, side, step, 'this is not a valid item name', ADR(EXPL));
				ELSE
					item_name := EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected];
					step := EXP_OVERWRITE_1;
				END_IF
			END_IF
			// ----------------------------------------------------------------------------------------
			// Copy all files and folders in this directory
			IF (EXPL.CMD[side].copy_all = TRUE) THEN
				step := EXP_COPY_ALL;
			END_IF
			// ----------------------------------------------------------------------------------------
			// View selected file
			IF (EXPL.CMD[side].view_file = TRUE) THEN
				step := EXP_FILE_VIEW;
			END_IF
			// ----------------------------------------------------------------------------------------
			// Download selected file or directory
			IF (EXPL.CMD[side].download = TRUE) THEN
				EXPL.VIS[side].file_full_path := '';
				item_name := EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected];
				// Make sure selected entry is valid
				IF(brsmemcmp(ADR(item_name), ADR('..'), 2) <> 0) THEN
					// Check if selected item is a single file
					IF(brsmemcmp(ADR(item_name), ADR('(DIR)'), 5) <> 0) THEN
						device_active := EXPL.PAR[side].device_active;
						dir_path := EXPL.PAR[side].dir_path;
						step := EXP_FILE_DOWNLOAD;
						// Selected item is a directory
					ELSE
						ReplaceString(ADR(item_name), ADR('(DIR)'), ADR(''), TRUE);
						step := EXP_FILE_DOWNLOAD_DIR;
					END_IF
				ELSE
					step := CreateError(ERR_DIR_DOWNLOAD_INVALID, side, step, 'item is not a valid directory', ADR(EXPL));
				END_IF
			END_IF
			// ----------------------------------------------------------------------------------------
			// Upload a new file
			IF (EXPL.CMD[side].upload = TRUE) THEN
				EXPL.VIS[side].file_full_path := '';
				device_active := EXPL.PAR[side].device_active;
				dir_path := EXPL.PAR[side].dir_path;
				step := EXP_FILE_UPLOAD;
			END_IF
			// ----------------------------------------------------------------------------------------
			// Delete the selected file
			IF (EXPL.CMD[side].delete = 1) THEN
				// Check if directory name is empty
				IF (EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected] = '')	THEN
					step := CreateError(ERR_EMPTY_ITEM, side, step, 'item name is empty', ADR(EXPL));
					// Check if new directory name fits into string
				ELSIF(brsstrlen(ADR(EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected])) + brsstrlen(ADR(EXPL.PAR[side].dir_path)) + 1 >= EXPL_DIR_PATH_LENGTH + EXPL_ITEM_LENGTH) THEN
					step := CreateError(ERR_PATH_EXCEEDS_MAX, side, step, 'directory path exceeds maximum length', ADR(EXPL));
					// Make sure that a valid item was selected
				ELSIF(EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected] = '..') THEN
					step := CreateError(ERR_INVALID_ITEM_NAME, side, step, 'this is not a valid item name', ADR(EXPL));
					// Delete a directory
				ELSIF(brsmemcmp(ADR(EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected]), ADR('(DIR)'), 5) = 0)	THEN
					item_name := EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected];
					step := EXP_DIR_DELETE;
					// Delete a file
				ELSE
					item_name := EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected];
					step := EXP_FILE_DELETE;
				END_IF
			END_IF
			// ----------------------------------------------------------------------------------------
			// Rename file or directory
			IF (EXPL.CMD[side].rename = TRUE) THEN
				// ------------------------------------------------------------------------------------
				// Check if new directory name is empty
				IF (EXPL.PAR[side].new_name = '') THEN
					step := CreateError(ERR_EMPTY_ITEM, side, step, 'new name is empty', ADR(EXPL));
					// Make sure that a valid item was selected
				ELSIF (EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected] = '..') THEN
					step := CreateError(ERR_INVALID_ITEM_NAME, side, step, 'this is not a valid item name', ADR(EXPL));
					// Rename a directory
				ELSIF(brsmemcmp(ADR(EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected]), ADR('(DIR)'), 5) = 0)	THEN
					step := EXP_DIR_RENAME;
					// Rename a file
				ELSE
					step := EXP_FILE_RENAME;
				END_IF
			END_IF
			
			// Set status
			EXPL.status_no := ERR_FUB_BUSY;

			//**********************************************************************************************
			// Read directory information
			//**********************************************************************************************
		EXP_READ_DIR:
			// Show current state
			animation := animation := WorkingStatus(ADR(EXPL), ADR('reading directory...'), animation);
			// ----------------------------------------------------------------------------------------
			// Clear all entrys
			brsmemset(ADR(EXPL.DAT[side]), 0, SIZEOF(EXPL.DAT[side]));
			EXPL.VIS[side].item_selected := 0;
			EXPL.DAT[side].item_num := 0;
			// ----------------------------------------------------------------------------------------
			// Add .. for directory up
			IF(EXPL.PAR[side].dir_path <> '/' AND EXPL.PAR[side].dir_path <> '') THEN
				EXPL.DAT[side].item_list[0] := '..';
				EXPL.DAT[side].item_num := 1;
			END_IF
			// ----------------------------------------------------------------------------------------
			// Set parameters and get device dir
			DInfo.enable 	:= TRUE;
			DInfo.pDevice	:= ADR(EXPL.PAR[side].device_active);
			DInfo.pPath 	:= ADR(EXPL.PAR[side].dir_path);
			DInfo();

			// ----------------------------------------------------------------------------------------
			// OK
			IF (DInfo.status = OK) THEN
				step := EXP_READ_DIR_1;
				// ----------------------------------------------------------------------------------------
				// Device is not available
			ELSIF (DInfo.status = fiERR_FILE_DEVICE) THEN
				EXPL.DAT[side].item_list[0] := 'not connected';
				step := CreateError(DInfo.status, side, step, 'not connected', ADR(EXPL));
				// ----------------------------------------------------------------------------------------
				// Device is not available
			ELSIF (DInfo.status = fiERR_DEVICE_MANAGER) THEN
				EXPL.DAT[side].item_list[0] := 'not connected';
				step := CreateError(DInfo.status, side, step, 'check device name and path', ADR(EXPL));
				// Error
			ELSIF (DInfo.status <> ERR_FUB_BUSY) THEN
				step := CreateError(DInfo.status, side, step, 'error dir info', ADR(EXPL));
			END_IF
			//**********************************************************************************************
			// Open directory
			//**********************************************************************************************
		EXP_READ_DIR_1:
			// Add current directory
			IF(EXPL.PAR[side].dir_path = '') THEN
				EXPL.PAR[side].dir_path := '/';
			END_IF
			DOpen.enable 	:= TRUE;
			DOpen.pDevice	:= ADR(EXPL.PAR[side].device_active);
			DOpen.pName 	:= ADR(EXPL.PAR[side].dir_path);
			DOpen();

			// ----------------------------------------------------------------------------------------
			// OK
			IF (DOpen.status = OK) THEN
				has_oversized_items := FALSE;
				step := EXP_READ_DIR_2;
				// Error
			ELSIF (DOpen.status <> ERR_FUB_BUSY) THEN
				step := CreateError(DOpen.status, side, step, 'error dir open', ADR(EXPL));
			END_IF;
			//**********************************************************************************************
			// Read file directory information
			//**********************************************************************************************
		EXP_READ_DIR_2:
			DRead.enable 	:= TRUE;
			DRead.ident		:= DOpen.ident;
			DRead.pData 	:= ADR(lDirReadData);
			DRead.data_len 	:= SIZEOF(lDirReadData);
			DRead();

			// ----------------------------------------------------------------------------------------
			// OK
			IF (DRead.status = OK) THEN
				// ------------------------------------------------------------------------------------
				// Verify that we still have space in list
				IF (EXPL.DAT[side].item_num < SIZEOF(EXPL.DAT[side].item_list)/SIZEOF(EXPL.DAT[side].item_list[0])) THEN
					// --------------------------------------------------------------------------------
					// Make sure file name contains filter
					IF (brsstrlen(ADR(EXPL.PAR[side].item_filter)) = 0 OR IsInstr(ADR(lDirReadData.Filename), ADR(EXPL.PAR[side].item_filter))) THEN
						brsmemset(ADR(tmp_str1), 0, SIZEOF(tmp_str1));
						// ----------------------------------------------------------------------------
						// Read file information
						IF (lDirReadData.Mode = fiFILE) THEN
							IF (brsstrlen(ADR(lDirReadData.Filename)) < EXPL_ITEM_LENGTH) THEN
								brsstrcpy(ADR(tmp_str1), ADR(lDirReadData.Filename));
								// --------------------------------------------------------------------
								// Generate file size
								IF (lDirReadData.Filelength > 1048576) THEN
									brsitoa(lDirReadData.Filelength/1048576, ADR(tmp_str2));
									brsstrcat(ADR(tmp_str2), ADR('M'));
								ELSIF (lDirReadData.Filelength > 1024) THEN
									brsitoa(lDirReadData.Filelength/1024, ADR(tmp_str2));
									brsstrcat(ADR(tmp_str2), ADR('K'));
								ELSE
									brsitoa(lDirReadData.Filelength, ADR(tmp_str2));
								END_IF
								InsertRecName(ADR(EXPL), tmp_str1, tmp_str2, side);
								EXPL.DAT[side].item_num := EXPL.DAT[side].item_num + 1;
							ELSE
								has_oversized_items := TRUE;
							END_IF
							// ----------------------------------------------------------------------------
							// Read directory information
						ELSIF (brsstrcmp(ADR(lDirReadData.Filename), ADR('.')) <> 0 AND brsstrcmp(ADR(lDirReadData.Filename), ADR('..')) <> 0 AND brsstrcmp(ADR(lDirReadData.Filename), ADR('System Volume Information')) <> 0) THEN
							IF (brsstrlen(ADR(lDirReadData.Filename)) < EXPL_ITEM_LENGTH-5) THEN
								// Copy directory name
								tmp_str1 := '(DIR)';
								brsstrcat(ADR(tmp_str1), ADR(lDirReadData.Filename));
								InsertRecName(ADR(EXPL), tmp_str1, '', side);
								EXPL.DAT[side].item_num := EXPL.DAT[side].item_num + 1;
							ELSE
								has_oversized_items := TRUE;
							END_IF
						END_IF
					END_IF
				ELSE
					step := CreateError(ERR_MAX_FILES_REACHED, side, step, 'maximum number of files reached', ADR(EXPL));
				END_IF
				// Last entry reached
			ELSIF (DRead.status = fiERR_NO_MORE_ENTRIES) THEN
				step := EXP_READ_DIR_3;
				// Error
			ELSIF (DRead.status <> ERR_FUB_BUSY) THEN
				step := CreateError(DRead.status, side, step, 'error dir read', ADR(EXPL));
			END_IF
			//**********************************************************************************************
			// Close directory information
			//**********************************************************************************************
		EXP_READ_DIR_3:
			DClose.enable 	:= TRUE;
			DClose.ident	:= DOpen.ident;
			DClose();

			// ----------------------------------------------------------------------------------------
			// OK
			IF (DClose.status = OK) THEN
				// Report error from dir read
				IF (DRead.status <> ERR_OK AND DRead.status <> fiERR_NO_MORE_ENTRIES) THEN
					step := CreateError(DRead.status, side, step, 'error dir read', ADR(EXPL));
				ELSE
					DClose.ident := 0;
					step := EXP_READ_DIR_4;
				END_IF
				// Error
			ELSIF (DClose.status <> ERR_FUB_BUSY) THEN
				step := CreateError(DClose.status, side, step, 'error dir close', ADR(EXPL));
			END_IF
			//**********************************************************************************************
			// Get device memory information
			//**********************************************************************************************
		EXP_READ_DIR_4:
			DMemInfo.enable 	:= TRUE;
			DMemInfo.pDevice	:= ADR(EXPL.PAR[side].device_active);
			DMemInfo();

			// ----------------------------------------------------------------------------------------
			// OK
			IF (DMemInfo.status = OK) THEN
				// Transfer device memory information
				EXPL.DAT[side].device_free := UDINT_TO_INT(DMemInfo.freemem/1048576);
				EXPL.DAT[side].device_size := UDINT_TO_INT(DMemInfo.memsize/1048576);
				// Select item after copy->refresh
				IF(do_select <> 0) THEN
					FOR ly:=0 TO EXPL.DAT[NOT USINT_TO_BOOL(do_select-1)].item_num DO
						IF(EXPL.DAT[USINT_TO_BOOL(do_select-1)].item_list[EXPL.VIS[USINT_TO_BOOL(do_select-1)].item_selected] = EXPL.DAT[NOT USINT_TO_BOOL(do_select-1)].item_list[ly]) THEN
							EXIT;
						END_IF
					END_FOR;
					EXPL.VIS[NOT USINT_TO_BOOL(do_select-1)].item_selected := ly;
					do_select := 0;
				END_IF
				// Reset command and return to wait state
				EXPL.CMD[side].refresh	:= FALSE;
				IF(has_oversized_items) THEN
					step := CreateError(ERR_NAME_EXCEEDS_MAX, side, step, 'one or more names exceeds maximum length', ADR(EXPL));
				ELSE
					step := EXP_WAIT;
				END_IF
				// Error
			ELSIF (DMemInfo.status <> ERR_FUB_BUSY) THEN
				step := CreateError(DMemInfo.status, side, step, 'error reading device memory information', ADR(EXPL));
			END_IF
			//**********************************************************************************************
			// Change directory
			//**********************************************************************************************
		EXP_DIR_CHANGE:
			// ----------------------------------------------------------------------------------------
			// Move one directory up
			IF (EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected] = '..') THEN
				lx := brsstrlen(ADR(EXPL.PAR[side].dir_path));
				WHILE lx>0 DO
					IF(brsmemcmp(ADR(EXPL.PAR[side].dir_path) + lx, ADR('/'), 1) = 0) THEN
						EXIT;
					ELSE
						brsmemset(ADR(EXPL.PAR[side].dir_path) + lx, 0, 1);
					END_IF
					lx := lx -1;
				END_WHILE
				brsmemset(ADR(EXPL.PAR[side].dir_path) + lx, 0, 1);
				// ----------------------------------------------------------------------------------------
				// Move one directory down
			ELSE
				// Add slash if not in root
				IF(EXPL.PAR[side].dir_path <> '/') THEN
					brsstrcat(ADR(EXPL.PAR[side].dir_path), ADR('/'));
				END_IF
				brsstrcat(ADR(EXPL.PAR[side].dir_path), ADR(EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected]) + 5);
				EXPL.CMD[side].refresh := 1;
			END_IF
			// Reset command and return to wait state
			EXPL.VIS[side].item_selected	:= 0;
			EXPL.CMD[side].dir_change 		:= 0;
			EXPL.CMD[side].refresh 			:= TRUE;
			step							:= EXP_WAIT;
			//**********************************************************************************************
			// Copy all items
			//**********************************************************************************************
		EXP_COPY_ALL:
			// Show current state
			animation := animation := WorkingStatus(ADR(EXPL), ADR('copying files and folders...'), animation);

			EXPL.VIS[side].item_selected := 0;
			// ----------------------------------------------------------------------------------------
			// Skip dots at the beginning of the list
			IF (EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected] = '..') THEN
				EXPL.VIS[side].item_selected := EXPL.VIS[side].item_selected + 1;
			END_IF
			// Check first entry
			IF(brsmemcmp(ADR(EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected]), ADR('(DIR)'), 5) = 0) THEN
				step := EXP_DIR_COPY;
			ELSE
				step := EXP_FILE_COPY;
			END_IF
			//**********************************************************************************************
			// Copy files
			//**********************************************************************************************
		EXP_FILE_COPY:
			// Show current state
			animation := WorkingStatus(ADR(EXPL), ADR('copying file...'), animation);

			// -----------------------------------------------------------------.----------------------
			// Proceed with copy all until last file is copied
			IF ((EXPL.VIS[side].item_selected < SIZEOF(EXPL.DAT[side].item_list)/SIZEOF(EXPL.DAT[side].item_list[0])) AND (EXPL.VIS[side].item_selected < EXPL.DAT[side].item_num)) THEN
				// ------------------------------------------------------------------------------------
				// Check if file name is empty
				IF (EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected] <> '') THEN
					// --------------------------------------------------------------------------------
					// Check if new file name fits into string
					IF(brsstrlen(ADR(EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected])) < EXPL_ITEM_LENGTH) THEN
						// ----------------------------------------------------------------------------
						// Initialize copy structure
						CreateCompletePath(EXPL.PAR[side].dir_path, EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected], ADR(tmp_str3));
						CreateCompletePath(EXPL.PAR[NOT side].dir_path, EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected], ADR(tmp_str4));
						FCopy.enable 	:= 1;
						FCopy.pSrcDev	:= ADR(EXPL.PAR[side].device_active);
						FCopy.pSrc		:= ADR(tmp_str3);
						FCopy.pDestDev  := ADR(EXPL.PAR[NOT side].device_active);
						FCopy.pDest		:= ADR(tmp_str4);
						FCopy.option 	:= FILE_OW_DETMEM;
						FCopy();

						// ----------------------------------------------------------------------------
						// OK
						IF (FCopy.status = OK AND EXPL.CMD[side].copy = 1) THEN
							// Select entry, reset command and refresh directory
							IF(COPY_AUTO_REFRESH = TRUE) THEN
								EXPL.CMD[NOT side].refresh := TRUE;
							END_IF
							IF(COPY_AUTO_SELECT = TRUE) THEN
								do_select := BOOL_TO_USINT(side) + 1;
							END_IF
							EXPL.CMD[side].copy	:= FALSE;
							step := EXP_WAIT;
							// ----------------------------------------------------------------------------
							// Proceed with next file
						ELSIF (FCopy.status = OK) THEN
							EXPL.VIS[side].item_selected := EXPL.VIS[side].item_selected + 1;
						ELSIF (FCopy.status <> ERR_FUB_BUSY) THEN
							step := CreateError(FCopy.status, side, step, 'error copying file', ADR(EXPL));
						END_IF
						// File name is too long
					ELSE
						step := CreateError(ERR_NAME_EXCEEDS_MAX, side, step, 'file name exceeds maximum length', ADR(EXPL));
					END_IF
					// File name  is empty
				ELSE
					step := CreateError(ERR_EMPTY_ITEM, side, step, 'file name is empty', ADR(EXPL));
				END_IF
				// ----------------------------------------------------------------------------------------
				// Finish copy all
			ELSE
				// Reset command and refresh directory
				IF(COPY_AUTO_REFRESH = TRUE) THEN
					EXPL.CMD[NOT side].refresh := TRUE;
				END_IF
				EXPL.CMD[side].copy_all			:= FALSE;
				EXPL.VIS[side].item_selected 	:= 0;
				step							:= EXP_WAIT;
			END_IF
			//**********************************************************************************************
			// Copy directory
			//**********************************************************************************************
		EXP_DIR_COPY:
			// Show current state
			animation := WorkingStatus(ADR(EXPL), ADR('copying directory...'), animation);

			// ----------------------------------------------------------------------------------------
			// Proceed with copy all until last file is copied
			IF ((EXPL.VIS[side].item_selected < SIZEOF(EXPL.DAT[side].item_list)/SIZEOF(EXPL.DAT[side].item_list[0])) AND (EXPL.VIS[side].item_selected < EXPL.DAT[side].item_num)) THEN
				IF (EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected] <> '') THEN
					// --------------------------------------------------------------------------------
					// Check if new directory name fits into path string
					IF(brsstrlen(ADR(EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected])) + brsstrlen(ADR(EXPL.PAR[NOT side].dir_path)) + 1 < EXPL_DIR_PATH_LENGTH) THEN
						// ----------------------------------------------------------------------------
						// Initialize copy structure
						CreateCompletePath(EXPL.PAR[side].dir_path, EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected], ADR(tmp_str3));
						CreateCompletePath(EXPL.PAR[NOT side].dir_path, EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected], ADR(tmp_str4));
						// ----------------------------------------------------------------------------
						// Make sure we are not copying directories recursively
						IF((EXPL.PAR[side].device_active = EXPL.PAR[NOT side].device_active) AND ((brsmemcmp(ADR(tmp_str3), ADR(tmp_str4), brsstrlen(ADR(tmp_str3))) = 0) OR (brsmemcmp(ADR(tmp_str4), ADR(tmp_str3), brsstrlen(ADR(tmp_str4))) = 0))) THEN
							step := CreateError(ERR_PATH_RECURSIVE, side, step, 'can not copy directory into itself', ADR(EXPL));
						ELSE
							DCopy.enable 	:= 1;
							DCopy.pSrcDev	:= ADR(EXPL.PAR[side].device_active);
							DCopy.pSrcDir	:= ADR(tmp_str3);
							DCopy.pDestDev 	:= ADR(EXPL.PAR[NOT side].device_active);
							DCopy.pDestDir 	:= ADR(tmp_str4);
							DCopy.option 	:= fiOVERWRITE;
							DCopy();
	
							// ----------------------------------------------------------------------------
							// OK
							IF (DCopy.status = OK AND EXPL.CMD[side].copy = 1) THEN
								// Reset command and refresh directory
								IF(COPY_AUTO_REFRESH = TRUE) THEN
									EXPL.CMD[NOT side].refresh := TRUE;
								END_IF
								IF (COPY_AUTO_SELECT = TRUE) THEN
									do_select := BOOL_TO_USINT(side) + 1;
								END_IF
								EXPL.CMD[side].copy	:= FALSE;
								step := EXP_WAIT;
								// ----------------------------------------------------------------------------
								// Proceed with next directory
							ELSIF (DCopy.status = OK) THEN
								EXPL.VIS[side].item_selected := EXPL.VIS[side].item_selected + 1;
								// Switch to file copy when no more directory can be found
								IF(brsmemcmp(ADR(EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected]), ADR('(DIR)'), 5) <> 0) THEN
									step := EXP_FILE_COPY;
								END_IF
								// Error
							ELSIF (DCopy.status <> ERR_FUB_BUSY) THEN
								step := CreateError(DCopy.status, side, step, 'error copying directory', ADR(EXPL));
							END_IF
						END_IF
						// Directory name is too long
					ELSE
						step := CreateError(ERR_PATH_EXCEEDS_MAX, side, step, 'directory path name exceeds maximum length', ADR(EXPL));
					END_IF
					// Directory name is empty
				ELSE
					step := CreateError(ERR_EMPTY_ITEM, side, step, 'directory name is empty', ADR(EXPL));
				END_IF
				// ----------------------------------------------------------------------------------------
				// Finish copy all
			ELSE
				// Reset command and refresh directory
				IF (COPY_AUTO_REFRESH = TRUE) THEN
					EXPL.CMD[NOT side].refresh := TRUE;
				END_IF
				EXPL.CMD[side].copy_all := FALSE;
				EXPL.VIS[side].item_selected := 0;
				step := EXP_WAIT;
			END_IF
			//**********************************************************************************************
			// Delete selected file
			//**********************************************************************************************
		EXP_FILE_DELETE:
			// Show current state
			animation := WorkingStatus(ADR(EXPL), ADR('deleting file...'), animation);

			// ----------------------------------------------------------------------------------------
			// Initialize file delete structure
			CreateCompletePath(EXPL.PAR[side].dir_path, item_name, ADR(tmp_str3));
			FDelete.enable		:= TRUE;
			FDelete.pDevice 	:= ADR(EXPL.PAR[side].device_active);
			FDelete.pName		:= ADR(tmp_str3);
			FDelete();

			// ----------------------------------------------------------------------------------------
			// OK
			IF (FDelete.status = OK) THEN
				// Reset command delete and return to wait state
				IF(EXPL.CMD[side].delete = TRUE) THEN
					EXPL.CMD[side].delete 	:= FALSE;
					EXPL.CMD[side].refresh  := TRUE;
					step := EXP_WAIT;
					// Proceed with command upload
				ELSE
					step := EXP_FILE_UPLOAD_1;
				END_IF
				// Error
			ELSIF (FDelete.status <> ERR_FUB_BUSY) THEN
				step := CreateError(FDelete.status, side, step, 'error deleting file', ADR(EXPL));
			END_IF
			//**********************************************************************************************
			// Rename selected file
			//**********************************************************************************************
		EXP_FILE_RENAME:
			// Show current state
			animation := WorkingStatus(ADR(EXPL), ADR('renaming file...'), animation);

			// ----------------------------------------------------------------------------------------
			// Initialize file delete structure
			CreateCompletePath(EXPL.PAR[side].dir_path, EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected], ADR(tmp_str2));
			CreateCompletePath(EXPL.PAR[side].dir_path, EXPL.PAR[side].new_name, ADR(tmp_str3));
			FRename.enable		:= TRUE;
			FRename.pDevice 	:= ADR(EXPL.PAR[side].device_active);
			FRename.pName		:= ADR(tmp_str2);
			FRename.pNewName	:= ADR(tmp_str3);
			FRename();

			// ----------------------------------------------------------------------------------------
			// OK
			IF (FRename.status = OK) THEN
				// Reset command and return to wait state
				EXPL.CMD[side].rename 	:= FALSE;
				EXPL.CMD[side].refresh  := TRUE;
				step := EXP_WAIT;
				// Error
			ELSIF (FRename.status <> ERR_FUB_BUSY) THEN
				step := CreateError(FRename.status, side, step, 'error renaming file', ADR(EXPL));
			END_IF
			//**********************************************************************************************
			// View selected file
			//**********************************************************************************************
		EXP_FILE_VIEW:		
			CreateCompletePath(EXPL.PAR[side].dir_path, EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected], ADR(tmp_str1));
			
			FOR lx:=0 TO SIZEOF(EXPL_VIEW_FILTER)/SIZEOF(EXPL_VIEW_FILTER[0]) - 1 DO
				IF(brsstrlen(ADR(tmp_str1)) >= brsstrlen(ADR(EXPL_VIEW_FILTER[lx])) AND EXPL_VIEW_FILTER[lx] <> '') THEN
					// -------------------------------------------------------------------------------- 		
					// Verify that file name contains filter											
					IF(brsmemcmp(ADR(tmp_str1) + brsstrlen(ADR(tmp_str1)) - brsstrlen(ADR(EXPL_VIEW_FILTER[lx])) , ADR(EXPL_VIEW_FILTER[lx]), brsstrlen(ADR(EXPL_VIEW_FILTER[lx]))) = 0) THEN
						EXPL.VIS[side].view_file_path := '/FileDevice:';
						brsstrcat(ADR(EXPL.VIS[side].view_file_path), ADR(EXPL.PAR[side].device_active));
						brsstrcat(ADR(EXPL.VIS[side].view_file_path), ADR(tmp_str1));
						EXPL.CMD[side].view_file := FALSE;
						EXPL.VIS[side].view_file := TRUE;
						step := EXP_WAIT;
						RETURN;
					END_IF
				END_IF
			END_FOR;
			step := CreateError(FRename.status, side, step, 'error this file extension is not supported for viewing', ADR(EXPL));
			//**********************************************************************************************
			// Download file
			//**********************************************************************************************
		EXP_FILE_DOWNLOAD:
			animation := WorkingStatus(ADR(EXPL), ADR('downloading file...'), animation);

			EXPL.VIS[side].file_full_path := device_active;
			IF dir_path <> '' THEN
				brsstrcat(ADR(EXPL.VIS[side].file_full_path), ADR(dir_path));
			END_IF
			brsstrcat(ADR(EXPL.VIS[side].file_full_path), ADR('/'));
			brsstrcat(ADR(EXPL.VIS[side].file_full_path), ADR(item_name));
			
			EXPL.VIS[side].file_status := 0;
			EXPL.VIS[side].download_execute := TRUE;
			step := EXP_FILE_DOWNLOAD_1;
			
			//**********************************************************************************************
			// Download file
			//**********************************************************************************************
		EXP_FILE_DOWNLOAD_1:
			IF EDGENEG(EXPL.VIS[side].download_execute) THEN
				EXPL.CMD[side].download := FALSE;
				
				// ----------------------------------------------------------------------------------------
				// OK
				IF (EXPL.VIS[side].file_status = OK) THEN
					step := EXP_WAIT;
					// Error access rights 
				ELSIF (EXPL.VIS[side].file_status = -1064165358) THEN
					step := CreateError(EXPL.VIS[side].file_status, side, step, 'user  has insufficient rights to access file or device', ADR(EXPL));
					// Error
				ELSE
					step := CreateError(EXPL.VIS[side].file_status, side, step, 'error downloading file', ADR(EXPL));
				END_IF
			END_IF
			//**********************************************************************************************
			// Download all files
			//**********************************************************************************************
		EXP_FILE_DOWNLOAD_DIR:
			// Show current state
			animation := WorkingStatus(ADR(EXPL), ADR('processing directory...'), animation);
			tmp_str1 := item_name;
			brsstrcat(ADR(tmp_str1), ADR('.tar.gz'));
			
			// ----------------------------------------------------------------------------------------
			// Initialize file zip structure
			CreateCompletePath(EXPL.PAR[side].dir_path, EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected], ADR(tmp_str2));
			
			zipArchive_0.enable := 1;
			zipArchive_0.pArchiveDevice := ADR('TMP_USER'); 
			zipArchive_0.pArchiveFile := ADR(tmp_str1);
			zipArchive_0.pSrcDevice := ADR(EXPL.PAR[side].device_active);
			zipArchive_0.pSrcFile := ADR(tmp_str2);
			zipArchive_0.pOptions := ADR('/COMPRESSION_LEVEL=7');
			zipArchive_0();
	
			// ----------------------------------------------------------------------------------------
			// OK
			IF (zipArchive_0.status = OK) THEN
				item_name := tmp_str1;
				device_active := 'TMP_USER';
				dir_path := '';
				step := EXP_FILE_DOWNLOAD;
				// Error
			ELSIF (zipArchive_0.status <> ERR_FUB_BUSY) THEN
				step := CreateError(zipArchive_0.status, side, step, 'error creating zip file', ADR(EXPL));
			END_IF
			//**********************************************************************************************
			// Upload file - verify parameters
			//**********************************************************************************************
		EXP_FILE_UPLOAD:
			// Show current state
			animation := WorkingStatus(ADR(EXPL), ADR('uploading file...'), animation);
			
			EXPL.VIS[side].file_full_path := device_active;
			brsstrcat(ADR(EXPL.VIS[side].file_full_path), ADR(dir_path));
			brsstrcat(ADR(EXPL.VIS[side].file_full_path), ADR('/'));

			EXPL.VIS[side].file_status := 0;
			EXPL.VIS[side].upload_execute := TRUE;
			step := EXP_FILE_UPLOAD_1;
			
			//**********************************************************************************************
			// Upload file
			//**********************************************************************************************
		EXP_FILE_UPLOAD_1:		
			IF EDGENEG(EXPL.VIS[side].upload_execute) THEN
				EXPL.CMD[side].upload := FALSE;
				
				// ----------------------------------------------------------------------------------------
				// OK
				IF (EXPL.VIS[side].file_status = OK) THEN
					EXPL.CMD[side].refresh := 1;

					step := EXP_WAIT;
					// Error access rights 
				ELSIF (EXPL.VIS[side].file_status = -1064165358) THEN
					step := CreateError(EXPL.VIS[side].file_status, side, step, 'user  has insufficient rights to access file or device', ADR(EXPL));
					// Error
				ELSE
					step := CreateError(EXPL.VIS[side].file_status, side, step, 'error uploading file', ADR(EXPL));
				END_IF
			END_IF

			//**********************************************************************************************
			// Create new directory
			//**********************************************************************************************
		EXP_DIR_CREATE:
			// Show current state
			animation := WorkingStatus(ADR(EXPL), ADR('creating directory...'), animation);

			// ----------------------------------------------------------------------------------------
			// Initialize directory create structure
			CreateCompletePath(EXPL.PAR[side].dir_path, EXPL.PAR[side].new_name, ADR(tmp_str3));
			DCreate.enable	:= 1;
			DCreate.pDevice := ADR(EXPL.PAR[side].device_active);
			DCreate.pName 	:= ADR(tmp_str3);
			DCreate();

			// ----------------------------------------------------------------------------------------
			// OK
			IF (DCreate.status = OK) THEN
				// Reset command and return to wait state
				EXPL.CMD[side].dir_create 	:= FALSE;
				EXPL.CMD[side].refresh 		:= TRUE;
				step := EXP_WAIT;
				// Error
			ELSIF (DCreate.status <> ERR_FUB_BUSY) THEN
				step := CreateError(DCreate.status, side, step, 'error creating directory', ADR(EXPL));
			END_IF
			//**********************************************************************************************
			// Delete selected directory
			//**********************************************************************************************
		EXP_DIR_DELETE:
			// Show current state
			animation := WorkingStatus(ADR(EXPL), ADR('deleting directory...'), animation);

			// ----------------------------------------------------------------------------------------
			// Initialize directory delete structure
			CreateCompletePath(EXPL.PAR[side].dir_path, item_name, ADR(tmp_str3));
			DDelete.enable	:= TRUE;
			DDelete.pDevice := ADR(EXPL.PAR[side].device_active);
			DDelete.pName 	:= ADR(tmp_str3);
			DDelete();

			// ----------------------------------------------------------------------------------------
			// OK
			IF (DDelete.status = OK) THEN
				// Reset command and return to wait state
				EXPL.CMD[side].delete := FALSE;
				EXPL.CMD[side].refresh := TRUE;
				step := EXP_WAIT;
				// Error
			ELSIF (DDelete.status <> ERR_FUB_BUSY) THEN
				step := CreateError(DDelete.status, side, step, 'error deleting directory', ADR(EXPL));
			END_IF
			//**********************************************************************************************
			// Rename selected directory
			//**********************************************************************************************
		EXP_DIR_RENAME:
			// Show current state
			animation := WorkingStatus(ADR(EXPL), ADR('renaming directory...'), animation);

			// ----------------------------------------------------------------------------------------
			// Initialize file delete structure
			CreateCompletePath(EXPL.PAR[side].dir_path, EXPL.DAT[side].item_list[EXPL.VIS[side].item_selected], ADR(tmp_str2));
			CreateCompletePath(EXPL.PAR[side].dir_path, EXPL.PAR[side].new_name, ADR(tmp_str3));
			DRename.enable		:= TRUE;
			DRename.pDevice 	:= ADR(EXPL.PAR[side].device_active);
			DRename.pName		:= ADR(tmp_str2);
			DRename.pNewName	:= ADR(tmp_str3);
			DRename();

			// ----------------------------------------------------------------------------------------
			// OK
			IF (DRename.status = OK) THEN
				// Reset command and return to wait state
				EXPL.CMD[side].rename 	:= FALSE;
				EXPL.CMD[side].refresh  := TRUE;
				step := EXP_WAIT;
				// Error
			ELSIF (DRename.status <> ERR_FUB_BUSY) THEN
				step := CreateError(DRename.status, side, step, 'error renaming directory', ADR(EXPL));
			END_IF
			//**********************************************************************************************
			// Overwrite file - Check if file exists
			//**********************************************************************************************
		EXP_OVERWRITE_1:					
			EXPL.VIS[side].overwrite_response := NONE;

			// ----------------------------------------------------------------------------------------
			// Checking for files with the same name		
			FOR lx:=0 TO EXPL.DAT[side].item_num DO	
				IF(EXPL.CMD[side].copy = TRUE AND EXPL.DAT[NOT side].item_list[lx] = item_name) THEN
					EXPL.VIS[side].overwrite_request := TRUE;
					step := EXP_OVERWRITE_2;
					RETURN;	 
				END_IF;
			END_FOR;
			
			// Proceed with copy command
			IF(brsmemcmp(ADR(item_name), ADR('(DIR)'), 5) = 0)	THEN
				step := EXP_DIR_COPY;
			ELSE
				step := EXP_FILE_COPY;
			END_IF
			//**********************************************************************************************
			// Overwrite file - Wait for message box response
			//**********************************************************************************************
		EXP_OVERWRITE_2:
			// Overwrite file
			IF(EXPL.VIS[side].overwrite_response = YES) THEN
				// Proceed with copy command
				IF(brsmemcmp(ADR(item_name), ADR('(DIR)'), 5) = 0)	THEN
					step := EXP_DIR_COPY;
				ELSE
					step := EXP_FILE_COPY;
				END_IF
				EXPL.VIS[side].overwrite_request := FALSE;

			// Do not overwrite file
			ELSIF(EXPL.VIS[side].overwrite_response = NO) THEN
				// Reset copy command				
				EXPL.CMD[side].copy	:= FALSE;
				EXPL.VIS[side].overwrite_request := FALSE;
				step := EXP_WAIT;
			END_IF		
	END_CASE

END_PROGRAM
