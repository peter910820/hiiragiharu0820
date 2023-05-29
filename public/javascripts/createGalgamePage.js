/* eslint-disable no-undef */

$(document).ready(function() {
  let width = $("#markdown").width();
  $("#translation").width(width+50);

  $(document).mousemove(function() {
    let height = $("#markdown").height();
    $("#translation").height(height+10);
  });

  $(window).on("resize", function() {
    let width = $("#markdown").width();
    $("#translation").width(width+50);
  });
  $("#color").change(function() {
    let color = $(this).val();
    let ex = document.getElementById("markdown");
    let text = ex.value;
    let start = ex.selectionStart;
    let end = ex.selectionEnd;
    final = text.substring(0,start) + `<font color="${color}">` + text.substring(start, end) + "</font>" + text.substring(end);
    ex.value = final;
    // $("#experience").append(color);
  })
});

function insertMarkdown(element){
  let input = document.getElementById("markdown");
  let text = input.value;
  let start = input.selectionStart;
  let end = input.selectionEnd;
  if(element == "```"){
    final = text.substring(0,start) + element + text.substring(start, end) + "\n" + element + text.substring(end);
  }else if(element == "* "){
    final = text.substring(0,start) + element + text.substring(start, end) + text.substring(end);
  }else{
    final = text.substring(0,start) + element + text.substring(start, end) + element + text.substring(end);
  }
  input.value = final;
}
function insertHasendtag(effect){
  let ex = document.getElementById("markdown");
  console.log("#".repeat(effect[1]));
  let text = ex.value;
  let start = ex.selectionStart;
  let end = ex.selectionEnd;
  final = text.substring(0,start) + "#".repeat(effect[1]) + " " + text.substring(start, end)+ text.substring(end);
  ex.value = final;
}
function insertWithoutendtag(effect){
  let ex = document.getElementById("markdown");
  let text = ex.value;
  let start = ex.selectionStart;
  let later = text.substring(start);
  final = text.substring(0,start) + `</${effect}>` + later;
  ex.value = final;
}
function cl(){
  let converter = new showdown.Converter();
  let md = document.getElementById("markdown").value;
  let html = converter.makeHtml(md);
  document.getElementById("translation").innerHTML = html;
  divValue = html.replace(/\t/g, "\\u0009"); // 將 \t 替換為 \u0009
  divValue = html.replace(/\n/g, "\\u000A"); // 將 \n 替換為 \u000A
  document.getElementById("translation__insert").value = divValue;
  console.log(document.getElementById("translation__insert").value);
}