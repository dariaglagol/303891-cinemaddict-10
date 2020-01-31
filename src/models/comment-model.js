export default class CommentModel {
  constructor(data) {

    this.id = data[`id`];
    this.author = data[`author`];
    this.emoji = data[`emotion`];
    this.text = data[`comment`];
    this.date = data[`date`];
  }

  toRAW() {
    return {
      'id': this.id,
      'author': this.author,
      'emotion': this.emoji,
      'comment': this.text,
      'date': this.date,
    };
  }

  static parseComment(data) {
    return new CommentModel(data);
  }

  static parseComments(data) {
    return data.map(CommentModel.parseComment);
  }

  static clone(data) {
    return new CommentModel(data.toRAW());
  }
}
