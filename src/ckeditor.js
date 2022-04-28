import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import AloeMagic from "./aloe-magic/aloe-magic";
import {Underline} from "@ckeditor/ckeditor5-basic-styles";
import Font from '@ckeditor/ckeditor5-font/src/font';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Undo from '@ckeditor/ckeditor5-undo/src/undo';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';

export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
	Essentials,
	Paragraph,
	Heading,
	List,
	Bold,
	Italic,
	Underline,
	Font,
	Alignment,
	Indent,
	IndentBlock,
	Undo,
	Table,
	TableToolbar,
	TableProperties,
	TableCellProperties,
	Image,
	ImageResize,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Base64UploadAdapter,
	PasteFromOffice,
	AloeMagic
]

ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			'undo','redo', '|',
			'aloeMagic', 'heading', '|',
			'fontSize', 'fontFamily', '|',
			'bold', 'italic', 'underline','|',
			'fontColor', 'fontBackgroundColor', 'insertTable', '|',
			'alignment','numberedList', 'bulletedList', 'outdent', 'indent', 'imageUpload' ],
		shouldNotGroupWhenFull: true
	},
	table: {
		contentToolbar: [
			'tableColumn', 'tableRow', 'mergeTableCells',
			'tableProperties', 'tableCellProperties'
		]
	},
	image: {
		styles: [
			'full', 'alignLeft', 'alignCenter', 'alignRight'
		],
		toolbar: [
			'imageStyle:full',
			'imageStyle:alignLeft',
			'imageStyle:alignCenter',
			'imageStyle:alignRight',
			'|',
			'imageTextAlternative'
		]
	},
	language: 'fr'
}

