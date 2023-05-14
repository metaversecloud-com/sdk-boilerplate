export default (message, e, res) => {
  if (e && e.data && e.data.errors) console.log(`Error: ${message}`, e?.data?.errors);
  else if (e) console.log(`Error: ${message}`, e);
  if (res) res.status(500).send({ error: e, success: false });
  return { error: e };
};
