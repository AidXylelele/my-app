function getPostDate () {
    const date = new Date(Date.now()).toDateString();

    const data = date.split(' ');

    const postDate = {
      dayOfWeek: data[0],
      day: data[2],
      month: data[1],
      year: data[3],
    };
    return postDate;
}