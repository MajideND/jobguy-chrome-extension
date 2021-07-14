$(document).ready(function() {
  var options = {
    max_value: 5,
    selected_symbol_type: "fontawesome_star",
    readonly: true
  };
  $(".rating").rate(options);
});

function getCurrentURL() {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      var tabURL = tabs;      
      onGot(tabURL);
    }
  );
}

function get_company_name_from_jobinja_1(path_url, url, tab_id) {
  chrome.tabs.sendMessage(tab_id, "jobinja_1", function(response) {
    if (response.status == true) {
      var company_name = response.company_name;
      company_name = company_name.replace(/ <span>(.*)/, "");
      jobguy_request(company_name);
    }
  });
}

function get_company_name_from_jobvision_1(path_url, url, tab_id) {
  chrome.tabs.sendMessage(tab_id, "jobvision_1", function(response) {
    if (response.status == true) {
      var company_name = response.company_name.trim();
      jobguy_request(company_name);
    }
  });
}

function get_company_name_from_quera_2(path_url, url, tab_id) {
  chrome.tabs.sendMessage(tab_id, "quera_2", function(response) {
    if (response.status == true) {
      var company_name = response.company_name.trim();
      jobguy_request(company_name);
    }
  });
}

function get_company_name_from_quera_1(path_url, url, tab_id) {
  chrome.tabs.sendMessage(tab_id, "quera_1", function(response) {
    if (response.status == true) {
      var company_name = response.company_name.trim();
      jobguy_request(company_name);
    }
  });
}

function getinfo_quera(url, tab_id) {
  $(document).ready(function() {
    $(".link-to-jobguy").prop("disabled", false);
    var path_url = url.replace(/^.*\/\/[^\/]+/, "");
    if (path_url.startsWith("/careers/job")) {
      get_company_name_from_quera_1(path_url, url, tab_id);
    }
    if (path_url.startsWith("/careers/company")) {
      get_company_name_from_quera_2(path_url, url, tab_id);
    }
  });
}

function getinfo_jobvision(url, tab_id) {
  $(document).ready(function() {
    $(".link-to-jobguy").prop("disabled", false);
    var path_url = url.replace(/^.*\/\/[^\/]+/, "");
    if (path_url.startsWith("/jobs/") || path_url.startsWith("/companies/")) {
      get_company_name_from_jobvision_1(path_url, url, tab_id);
    }
  });
}

function getinfo_jobinja(url, tab_id) {
  $(document).ready(function() {
    $(".link-to-jobguy").prop("disabled", false);
    var path_url = url.replace(/^.*\/\/[^\/]+/, "");
    if (path_url.startsWith("/companies")) {
      get_company_name_from_jobinja_1(path_url, url, tab_id);
    }
  });
}
function onGot(data) {
  var url = data[0].url;
  var tab_id = data[0].id;
  let domain = new URL(url);
  domain.hostname;
  domain = domain.hostname.replace("www.", "");
  if (domain == "jobinja.ir") {
    getinfo_jobinja(url, tab_id);
    return;
  }
  if (domain == "jobvision.ir") {
    getinfo_jobvision(url, tab_id);
    return;
  }
  if (domain == "quera.ir") {
    getinfo_quera(url, tab_id);
    return;
  }
  $(".salary").text(" - ");
  $(".company-rating").text("سایت پشتیبانی نمیشه!");
  $(".link-to-jobguy").prop("disabled", true);
}
function onError(error) {
}
getCurrentURL();


$(document).on("click",".show-reviews",function () {
  $(".reviews").show();
  $(".interviews").hide();
  $(".show-reviews").parent().addClass("is-active");
  $(".show-interviews").parent().removeClass("is-active");
});
$(document).on("click",".show-interviews",function () {
  $(".interviews").show();
  $(".reviews").hide();
  $(".show-interviews").parent().addClass("is-active");
  $(".show-reviews").parent().removeClass("is-active");
});