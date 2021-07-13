var profile_url = null;

function jobguy_interviews(slug) {
  $.get(
    "https://api.jobguy.work/public/company/" +
      slug +
      "/interview/?size=18&index=0",
    function(data) {
      var data = data.data;
      data.forEach(element => {
        $(".interviews").append(
          `<div class="box">
            <b>` +
            element.title +
            `</b><br><div class="rating" data-rate-value=` +
            element.total_rate +
            `></div>` +
            element.description +
            `
        </div>`
        );
      });
      var options = {
        max_value: 5,
        selected_symbol_type: "fontawesome_star",
        readonly: true
      };
      $(".rating").rate(options);
    }
  );
}

function jobguy_reviews(slug) {
  $.get(
    "https://api.jobguy.work/public/company/" +
      slug +
      "/review/?size=18&index=0",
    function(data) {
      var data = data.data;
      data.forEach(element => {
        $(".reviews").append(
          `<div class="box">
              <b>` +
            element.title +
            `</b><br><div class="rating" data-rate-value=` +
            element.over_all_rate +
            `></div>` +
            element.description +
            `
          </div>`
        );
      });
      var options = {
        max_value: 5,
        selected_symbol_type: "fontawesome_star",
        readonly: true
      };
      $(".rating").rate(options);
    }
  );
}

function jobguy_search(name) {
  $.get(
    "https://api.jobguy.work/public/company/list/?name=" +
      encodeURIComponent(name) +
      "&city=&industry=&deleted=false&order_by=HOTTEST&index=0&size=18",
    function(data) {
      if (data.data.length < 1) {
        $(".company-rating").text("یافت نشد");
        $(".salary").text("یافت نشد");
        return;
      }
      var company = data["data"][0];
      $(".company-name").text(company.name);
      $(".logo").attr("src", "https://media.jobguy.work" + company.logo);
      $(".salary").text(
        company.salary_min + " تا " + company.salary_max + " میلیون تومان"
      );
      $(".company-rating").html(
        `<div class="rating" data-rate-value=` +
          company.over_all_rate +
          `></div> با  ` +
          company.total_review +
          ` نظر`
      );
      profile_url = "https://jobguy.work/company/" + company.company_slug;
      var options = {
        max_value: 5,
        selected_symbol_type: "fontawesome_star",
        readonly: true
      };
      $(".rating").rate(options);
      jobguy_reviews(company.company_slug);
      jobguy_interviews(company.company_slug);
    }
  );
}

function jobguy_request(name) {
  $(".comment-area").show();
  jobguy_search(name);
}

$(document).on("click", ".link-to-jobguy", function() {
  if (profile_url && profile_url != null) {
    browser.tabs.create({ url: profile_url });
  }
});
