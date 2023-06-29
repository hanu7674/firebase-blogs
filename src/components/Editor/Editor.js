import React, { useRef} from 'react';
import JoditEditor from "jodit-react";
const Editor = ({placeholder, readonly, data, setData, onBlur}) => {	  
	const editor = useRef(null)
    const buttons = [
			"undo",
			"redo",
			"|",
			"bold",
			"strikethrough",
			"underline",
			"italic",
			"|",
			"superscript",
			"subscript",
			"|",
			"align",
			"|",
			"ul",
			"ol",
			"outdent",
			"indent",
			"|",
			"font",
			"fontsize",
			"brush",
			"paragraph",
			"search",
			"|",
			"image",
			"link",
			"table",
			"|",
			"hr",
			"eraser",
			"copyformat",
			"|",
			"fullsize",
			"selectall",
			"print",
			"|",
			"source",
			// "|",
			"|",
			"upload",
    ];
    const config = {
			
			hidePoweredByJodit: true,
			useSearch: true,
			statusbar: true,
			showGutter: true,
			theme: "dark",
			beautifyHTML: true,
			colorPickerDefaultTab: "color",
			activeButtonsInReadOnly: ["source", "fullsize", "print", "about", "dots"],
			wrap: true,
			highlightActiveLine: true,
        	toolbar: true,
            toolbarSticky: false,
			spellcheck: true,
			language: "en",
			toolbarButtonSize: "medium",
			toolbarAdaptive: false,
			showCharsCounter: true,
			showPlaceholder: true,
			showWordsCounter: true,
			showXPathInStatusbar: false,
			askBeforePasteHTML: false,
			askBeforePasteFromWord: false,
			defaultActionOnPaste: "insert_clear_html",
			buttons: buttons,
			imageeditor: {
				crop: true,
				resize: true,
			},
			uploader: {
				// url: "http://localhost:3001/connector/index.php?action=upload",
				insertImageAsBase64URI: true,
				imagesExtensions: ["jpg", "png", "jpeg"],
			},
			zIndex: 0,
			saveModeInCookie: false,
			editorCssClass: false,
			triggerChangeEvent: true,
			width: "auto",
			minHeight: 400,
			direction: "",
			debugLanguage: false,
			i18n: "en",
			tabIndex: -1,
			enter: "P",
			useSplitMode: true,
			colors: {
				greyscale: [
					"#000000",
					"#434343",
					"#666666",
					"#999999",
					"#B7B7B7",
					"#CCCCCC",
					"#D9D9D9",
					"#EFEFEF",
					"#F3F3F3",
					"#FFFFFF",
				],
				palette: [
					"#980000",
					"#FF0000",
					"#FF9900",
					"#FFFF00",
					"#00F0F0",
					"#00FFFF",
					"#4A86E8",
					"#0000FF",
					"#9900FF",
					"#FF00FF",
				],
				full: [
					"#E6B8AF",
					"#F4CCCC",
					"#FCE5CD",
					"#FFF2CC",
					"#D9EAD3",
					"#D0E0E3",
					"#C9DAF8",
					"#CFE2F3",
					"#D9D2E9",
					"#EAD1DC",
					"#DD7E6B",
					"#EA9999",
					"#F9CB9C",
					"#FFE599",
					"#B6D7A8",
					"#A2C4C9",
					"#A4C2F4",
					"#9FC5E8",
					"#B4A7D6",
					"#D5A6BD",
					"#CC4125",
					"#E06666",
					"#F6B26B",
					"#FFD966",
					"#93C47D",
					"#76A5AF",
					"#6D9EEB",
					"#6FA8DC",
					"#8E7CC3",
					"#C27BA0",
					"#A61C00",
					"#CC0000",
					"#E69138",
					"#F1C232",
					"#6AA84F",
					"#45818E",
					"#3C78D8",
					"#3D85C6",
					"#674EA7",
					"#A64D79",
					"#85200C",
					"#990000",
					"#B45F06",
					"#BF9000",
					"#38761D",
					"#134F5C",
					"#1155CC",
					"#0B5394",
					"#351C75",
					"#733554",
					"#5B0F00",
					"#660000",
					"#783F04",
					"#7F6000",
					"#274E13",
					"#0C343D",
					"#1C4587",
					"#073763",
					"#20124D",
					"#4C1130",
				],
			},
			table: {
				allowCellResize: true,
				allowCellSelection: true,
				selectionCellStyle: "",
				useExtraClassesOptions: true,
			},
			imageDefaultWidth: 100,
			removeButtons: [],
			disablePlugins: [],
			extraButtons: [],
			sizeLG: 900,
			sizeMD: 700,
			sizeSM: 400,
			buttonsXS: [
				"bold",
				"image",
				"|",
				"brush",
				"paragraph",
				"|",
				"align",
				"|",
				"undo",
				"redo",
				"|",
				"eraser",
				"dots",
			],
			events: {},
			textIcons: false,
			allowFiles: true,
			allowFileMove: true,
			allowFileUpload: true,
			allowFileUploadRemote: true,
			allowFileRemove: true,
			allowFileRename: true,
			allowFolders: true,
			allowFolderCreate: true,
			allowFolderMove: true,
			allowFolderRemove: true,
			allowFolderRename: true,
			allowImageResize: true,
			allowImageCrop: true,
			readonly: false || readonly,
			placeholder: placeholder || "Start typings...",
			blur: onBlur,
		};

	return (
            <JoditEditor
				
            	ref={editor}
                value={data}
                config={config}
		        tabIndex={1} 
				// onChange={(newContent) => setData(newContent)}
                onBlur={(newContent) => setData(newContent)}
            />
        );
}
export default Editor