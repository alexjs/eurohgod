// Deal with updates

exports.submit = function (req,res){
  updateCount(req);
  res.redirect('/');
}