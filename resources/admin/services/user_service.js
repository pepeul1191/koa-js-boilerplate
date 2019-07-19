import $ from 'jquery';

var UserService = {
  list: function(page, step){
    var resp = {
      status: 200, 
      message: ''
    };
    $.ajax({
      type: 'GET',
      url: BASE_URL + 'user/list',
      data: { 
        step: step,
        page: page,
      },
      headers: {
        [CSRF_KEY]: CSRF,
      },
      async: false,
      success: function(data){
				resp.message = JSON.parse(data);
      },
      error: function(xhr, status, error){
        console.error(error);
				resp.message = JSON.parse(xhr.responseText);
				resp.status = 500;
      }
    });
    return resp;
  },
  get: function(_id){
    var resp = {
      status: 200, 
      message: ''
    };
    $.ajax({
      type: 'GET',
      url: BASE_URL + 'user/get',
      data: { 
        _id: _id,
      },
      headers: {
        [CSRF_KEY]: CSRF,
      },
      async: false,
      success: function(data){
				resp.message = JSON.parse(data);
      },
      error: function(xhr, status, error){
        console.error(error);
				resp.message = JSON.parse(xhr.responseText);
				resp.status = xhr.status;
      }
    });
    return resp;
  },
  save: function(data){
    var resp = {
      status: 200, 
      message: ''
    };
    $.ajax({
      type: 'POST',
      url: BASE_URL + 'user/save',
      data: { 
        data: data,
      },
      headers: {
        [CSRF_KEY]: CSRF,
      },
      async: false,
      success: function(data){
				resp.message = JSON.parse(data);
      },
      error: function(xhr, status, error){
        console.error(error);
				resp.message = JSON.parse(xhr.responseText);
        resp.status = xhr.status;
      }
    });
    return resp;
  },
  upload: function(form_data){
    var resp = {
      status: 200, 
      message: ''
    };
    $.ajax({
			type: 'POST',
			url: BASE_URL + 'user/picture/upload',
			headers: {
				[CSRF_KEY]: CSRF,
			},
			data: form_data,
			//use contentType, processData for sure.
			contentType: false,
      processData: false,
      async: false,
			beforeSend: function() {
			},
			success: function(data) {
				resp.message = data;
			},
			error: function(xhr, status, error){
        console.error(xhr.responseText);
        resp.status = xhr.status;
        resp.message = xhr.responseText;
			}
    });
    return resp;
  },
};

export default UserService;
