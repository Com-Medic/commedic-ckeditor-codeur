import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import AloeMagic from "./aloe-magic/aloe-magic";

export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
	Essentials, Paragraph, Heading, List, Bold, Italic, AloeMagic
]

ClassicEditor.defaultConfig = {
	toolbar: {
		items: [ 'heading', 'bold', 'italic', 'numberedList', 'bulletedList', 'aloeMagic' ]
	},
	language: 'fr'
}


/*ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [ Essentials, Paragraph, Heading, List, Bold, Italic, AloeMagic ],
		toolbar: [ 'heading', 'bold', 'italic', 'numberedList', 'bulletedList', 'aloeMagic' ]
	} )
	.then( editor => {
		console.log( 'Editor was initialized', editor );
	} )
	.catch( error => {
		console.error( error.stack );
	} );
*/
