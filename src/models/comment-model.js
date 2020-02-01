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

  static parseComment(comment) {
    return new CommentModel(comment);
  }

  static parseComments(comments) {
    return comments.map(CommentModel.parseComment);
  }

  static clone(comment) {
    return new CommentModel(comment.toRAW());
  }
}
