

$(function(){
	// instantiate the bloodhound suggestion engine
	var apis = new Bloodhound({
	  datumTokenizer: function(d) {
	  	console.log(d.slug);
	  	return  d.slug.split(/[\.\-]+/); 
	  },
	  queryTokenizer: Bloodhound.tokenizers.whitespace,
	  prefetch: {
	  	url: '/api/assets/js/apis.json',
		cacheKey: 'apis',
		thumbprint: Date.now().toString(),
		ttl:1
	  },
	  limit: 10
	});
	 
	// initialize the bloodhound suggestion engine
	apis.initialize();
	 
	// instantiate the typeahead UI
	$('#search').typeahead(null, {
	  displayKey: 'title',
	  source: apis.ttAdapter()
	}).on('typeahead:selected', function(evt, sug){
		evt.preventDefault();
		var slug = sug.slug,
			url = 'http://' + window.location.host + '/api/' + slug + '/';
		console.log(url);
		window.location = url;
	});
});