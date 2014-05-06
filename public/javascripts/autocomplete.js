$(function() {
  var airports = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: '/airports',
        remote: '/airports?q=%QUERY'
  });

  airports.initialize();

  $('.typeahead').typeahead(null, {
      name: 'best-pictures',
      displayKey: 'val',
      source: airports.ttAdapter()
  });
});
