
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import AloeMagicUI from "./aloe-magic-ui";
import AloeMagicEditing from "./aloe-magic-editing";

export default class AloeMagic extends Plugin {
	static get requires() {
		return [ AloeMagicUI, AloeMagicEditing ];
	}
}
