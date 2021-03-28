const timeout = 1 * 1000;
export const iterate = (limit, iter) => {
  iter = iter || 0;
  postMessage("HI " + limit + " " + iter);
  if (iter >= limit) {
      postMessage("DONE");
      return;
  }

  postMessage("vib");
  let next = iter + 1;
  setTimeout(function() {
      iterate(limit, next)
  }, timeout);
}