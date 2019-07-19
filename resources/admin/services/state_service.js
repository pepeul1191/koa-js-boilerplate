import $ from 'jquery';

var StateService = {
  list: function(){
    var resp = {};
    $.ajax({
      type: 'GET',
      url: BASE_URL + 'state/list',
      data: { 
      },
      headers: {
        [CSRF_KEY]: CSRF,
      },
      async: false,
      success: function(data){
				resp = JSON.parse(data);
      },
      error: function(xhr, status, error){
        console.error(error);
				resp.message = JSON.parse(xhr.responseText);
				resp.status = 500;
      }
    });
    return resp;
  },
};

export default StateService;