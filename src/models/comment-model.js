export default class Comment {
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
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }

  static clone(data) {
    return new Comment(data.toRAW());
  }
}
