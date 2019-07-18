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
  save: function(user){
    var resp = {
      status: 200, 
      message: ''
    };
    $.ajax({
      type: 'POST',
      url: BASE_URL + 'user/save',
      data: { 
        id: user.id,
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
};

export default UserService;
