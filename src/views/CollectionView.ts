import { Collection } from '../models/Collection';

export abstract class CollectionView<T, K> {
  constructor(public collection: Collection<T, K>, private parent: Element) {
    this.bindCollection();
  }

  abstract renderItem(model: T, itemParent: Element): void;

  bindCollection() {
    this.collection.on('change', () => {
      this.render();
    });
  }

  render() {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');

    this.collection.models.forEach((model: T): void => {
      const itemParent = document.createElement('div');
      this.renderItem(model, itemParent);
      templateElement.content.append(itemParent);
    });

    this.parent.append(templateElement.content);
  }
}
