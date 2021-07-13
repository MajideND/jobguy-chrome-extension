chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  var response = { status: false };
  if (request == "jobinja_1") {
    var company_name = document.getElementsByClassName("c-companyHeader__name");
    if (company_name) {
      company_name = company_name[0].innerHTML;
      response = { status: true, company_name: company_name };
    }
  }

  if (request == "quera_1") {
    var company_name = document.querySelectorAll('h1.header')[0];
    if (company_name) {
      company_name = company_name.innerHTML;
      response = { status: true, company_name: company_name };
    }
  }

  if (request == "jobvision_1") {
    var company_name = document.getElementsByClassName(
      "text-black font-size-2 font-weight-bold px-0 py-2"
    )[0];

    if (company_name) {
      company_name = company_name.innerHTML;
      response = { status: true, company_name: company_name };
    } else {
      company_name = document.getElementsByClassName(
        "font-size-1 text-black font-weight-bold"
      )[0];
      if (company_name) {
        company_name = company_name.innerHTML;
        response = { status: true, company_name: company_name };
      }
    }
  }
  sendResponse(response);
});
