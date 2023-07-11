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
import {SourceEditing} from "@ckeditor/ckeditor5-source-editing";

export default class ClassicEditor extends ClassicEditorBase {}

const customColorPalette = [
	{
		color: '#000000',
		label: 'Black'
	},
	{
		color: '#4d4d4d',
		label: 'Dim grey'
	},
	{
		color: '#999999',
		label: 'Grey'
	},
	{
		color: '#e6e6e6',
		label: 'Light grey'
	},
	{
		color: '#ffffff',
		label: 'White',
		hasBorder: true
	},
	{
		color: '#e42f2b',
		label: 'Red'
	},
	{
		color: '#f8eb25',
		label: 'Yellow'
	},
	{
		color: '#f07d2d',
		label: 'Orange'
	},
	{
		color: '#2da440',
		label: 'Green'
	},
	{
		color: '#429bcc',
		label: 'Blue'
	},
	{
		color: '#ef84ae',
		label: 'Pink'
	},
	{
		color: '#e2b18d',
		label: 'Beige'
	},
	{
		color: '#9168a0',
		label: 'Purple'
	}
];

ClassicEditor.builtinPlugins = [
	Essentials,
	Paragraph,
	SourceEditing,
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
			'LireCouleurFormat', '|',
			'fontSize', 'fontFamily', '|',
			'bold', 'italic', 'underline','|',
			'fontColor', 'fontBackgroundColor', 'insertTable', '|',
			'alignment','numberedList', 'bulletedList', 'outdent', 'indent', 'imageUpload', '|',
			'sourceEditing' ],
		shouldNotGroupWhenFull: true
	},
	fontColor: {
		colors: [
			{
				color: 'rgb(0, 0, 0)',
				label: 'Black'
			},
			{
				color: 'rgb(77, 77, 77)',
				label: 'Dim grey'
			},
			{
				color: 'rgb(153, 153, 153)',
				label: 'Grey'
			},
			{
				color: 'rgb(230, 230, 230)',
				label: 'Light grey'
			},
			{
				color: 'rgb(255, 255, 255)',
				label: 'White',
				hasBorder: true
			},
			{
				color: 'rgb(228, 47, 43)',
				label: 'Red'
			},
			{
				color: 'rgb(248, 235, 37)',
				label: 'Yellow'
			},
			{
				color: 'rgb(240, 125, 45)',
				label: 'Orange'
			},
			{
				color: 'rgb(45, 164, 64)',
				label: 'Green'
			},
			{
				color: 'rgb(66, 155, 204)',
				label: 'Blue'
			},
			{
				color: 'rgb(239, 132, 174)',
				label: 'Pink'
			},
			{
				color: 'rgb(226, 177, 141)',
				label: 'Beige'
			},
			{
				color: 'rgb(145, 104, 160)',
				label: 'Purple'
			}
		]
	},
	fontBackgroundColor: {
		colors: [
			{
				color: 'rgb(0, 0, 0)',
				label: 'Black'
			},
			{
				color: 'rgb(77, 77, 77)',
				label: 'Dim grey'
			},
			{
				color: 'rgb(153, 153, 153)',
				label: 'Grey'
			},
			{
				color: 'rgb(230, 230, 230)',
				label: 'Light grey'
			},
			{
				color: 'rgb(255, 255, 255)',
				label: 'White',
				hasBorder: true
			},
			{
				color: 'rgb(228, 47, 43)',
				label: 'Red'
			},
			{
				color: 'rgb(248, 235, 37)',
				label: 'Yellow'
			},
			{
				color: 'rgb(240, 125, 45)',
				label: 'Orange'
			},
			{
				color: 'rgb(45, 164, 64)',
				label: 'Green'
			},
			{
				color: 'rgb(66, 155, 204)',
				label: 'Blue'
			},
			{
				color: 'rgb(239, 132, 174)',
				label: 'Pink'
			},
			{
				color: 'rgb(226, 177, 141)',
				label: 'Beige'
			},
			{
				color: 'rgb(145, 104, 160)',
				label: 'Purple'
			}
		]
	},
	fontFamily: {
		options: [
			'default',
			'Arial, Helvetica, sans-serif',
			'Courier New, Courier, monospace',
			'Georgia, serif',
			'Lucida Sans Unicode, Lucida Grande, sans-serif',
			'Tahoma, Geneva, sans-serif',
			'Times New Roman, Times, serif',
			'Trebuchet MS, Helvetica, sans-serif',
			'Verdana, Geneva, sans-serif',
			'Merriweather, Times, serif',
			'Comic sans MS, Helvetica sans-serif',
			'CrayonE, Times, serif',
			'CrayonL, Times, serif',
			'Cursif, Times, serif',
			'Phone, Times, serif',
			'PlumBAE, Times, serif',
			'PlumBAL, Times, serif',
			'alamain, Times, serif',
		],
		supportAllValues: true
	},
	fontSize: {
		options: [
			8,
			9,
			10,
			11,
			12,
			14,
			18,
			24,
			30,
			36,
			48
		],
		supportAllValues: true
	},
	table: {
		contentToolbar: [
			'tableColumn', 'tableRow', 'mergeTableCells',
			'tableProperties', 'tableCellProperties'
		],
		// Set the palettes for tables.
		tableProperties: {
			borderColors: customColorPalette,
			backgroundColors: customColorPalette
		},

		// Set the palettes for table cells.
		tableCellProperties: {
			borderColors: customColorPalette,
			backgroundColors: customColorPalette
		}
	},
	image: {
		styles: [
			'full', 'alignLeft', 'alignCenter', 'alignRight'
		],
		toolbar: [
			'imageStyle:alignLeft',
			'imageStyle:alignCenter',
			'imageStyle:alignRight',
			'|',
			'imageTextAlternative'
		]
	},
	language: 'fr'
}

