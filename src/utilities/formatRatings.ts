export const formatRatings = (rating: number) => {
    const ratingsArr = Array(5).fill(false);
    let idx = 0;
    let length = Math.floor(rating);
    while (length > 0) {
      ratingsArr[idx] = true;
      idx++;
      length--;
    }
    return ratingsArr;
  };