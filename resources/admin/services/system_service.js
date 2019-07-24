import $ from 'jquery';

var SystemService = {
  list: function(page, step){
    var resp = {
      status: 200, 
      message: ''
    };
    $.ajax({
      type: 'GET',
      url: BASE_URL + 'system/list',
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
      url: BASE_URL + 'system/get',
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
      url: BASE_URL + 'system/save',
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
  delete: function(_id){
    var resp = {
      status: 200, 
      message: ''
    };
    $.ajax({
      type: 'POST',
      url: BASE_URL + 'system/delete',
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
};

export default SystemService;
