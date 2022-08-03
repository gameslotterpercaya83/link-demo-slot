'use babel';

import LinkDemoSlotView from './link-demo-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  linkDemoSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.linkDemoSlotView = new LinkDemoSlotView(state.linkDemoSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.linkDemoSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'link-demo-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.linkDemoSlotView.destroy();
  },

  serialize() {
    return {
      linkDemoSlotViewState: this.linkDemoSlotView.serialize()
    };
  },

  toggle() {
    console.log('LinkDemoSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
