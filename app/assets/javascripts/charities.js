//****** Document ready (allows DOM manipulation)
$(function() {
  charityClickHandler(); //* always runs
  newCharityClickHandler(); //* listen for new charity submit
  charityShowClickHandler();
  //ensures JS runs when page refreshes
  if ($(".charities.index").length > 0) {
    charitiesIndexPageLoadHandler(); //* only runs for charities index page
  } else if ($(".charities.show").length > 0) {
    charityShowPageLoadHandler(); //* only runs for charity show page
  }
});

const charitiesIndexPageLoadHandler = () => {
  // alert("test");
  history.pushState(null, null, "/charities");
  fetch("/charities.json") //* fetch requests returns a promise
    .then(res => res.json()) //* when a promise is resolved with a value you can add .then method
    .then(charities => {
      $("#app-container").html("").append(`
				<h2>Participating Charities</h2>
			`);

      charities.forEach(charity => {
        let newCharity = new Charity(charity);
        let charityHtml = newCharity.formatIndex();
        $("#app-container").append(charityHtml); //* id container in application.html.erb (layouts)
      });
    });
};

const charityClickHandler = () => {
  $(document).on("click", ".charities-link", e => {
    e.preventDefault();
    // alert("test");
    charitiesIndexPageLoadHandler();
  });
};

const charityShowPageLoadHandler = () => {
  // alert("show page");
  $("#app-container").html("");
  // console.log("show page");
  $.get(`${window.location.href}.json`, function(data) {
    const charityId = data.id;
    history.pushState(null, null, `/charities/${charityId}`);
    fetch(`/charities/${charityId}.json`)
      .then(res => res.json())
      .then(charity => {
        let newCharity = new Charity(charity);
        let charityHtml = newCharity.formatShow();
        $("#app-container").append(charityHtml);
      });
  });
};

const charityShowClickHandler = () => {
  $(document).on("click", ".show-link", function(e) {
    e.preventDefault();
    // alert("test");
    $("#app-container").html("");
    let charityId = $(this).attr("data-id");
    history.pushState(null, null, `/charities/${charityId}`);
    fetch(`/charities/${charityId}.json`)
      .then(res => res.json())
      .then(charity => {
        let newCharity = new Charity(charity);
        let charityHtml = newCharity.formatShow();
        $("#app-container").append(charityHtml);
      });
  });
};

const newCharityClickHandler = () => {
  $("#new_charity").on("submit", function(e) {
    e.preventDefault();
    // alert("test");
    const values = $(this).serialize(); //* serializes the data entered into the form

    $.post(`/charities`, values).done(function(data) {
      $("#app-container").html("");
      const newCharity = new Charity(data);
      const newCharityHtml = newCharity.formatShow();

      $("#app-container").append(newCharityHtml);
    });
  });
};

//****** Constructor functions
class Charity {
  constructor(charity) {
    this.name = charity.name;
    this.description = charity.description;
    this.id = charity.id;
    this.runs = charity.runs;
  }
}

//****** Prototype functions - can't use arrow functions for prototype methods
Charity.prototype.formatIndex = function() {
  let charityHtml = `
		<ul>
			<li><a href='/charities/${this.id}' class="show-link charity-name" data-id='${this.id}'><strong>${this.name}</strong></a></li>
			<p>${this.description}</p>
		</ul>
	`;
  return charityHtml;
};

Charity.prototype.formatShow = function() {
  let charityRuns = this.runs.map(run => {
    if (run) {
      return `<li>Distance: ${run.distance} - Raised: ${run.distance *
        3} - Location: ${run.location} - <a href="/user/${run.user}">${
        run.username
      }</a></li>`;
    }
  });

  let charityHtml = `
		<h2>${this.name}</h2>
		<p>${this.description}</p>

		<h3>Runs</h3>
		<ul>
			${charityRuns.join("")}
		</ul>

		<a class="boost-btn btn-primary btn-sm" href='/charities/${
      this.id
    }/runs'>View Runs </a>&nbsp;
		<a class="boost-btn btn-primary btn-sm" href='/charities/${
      this.id
    }/runs/new'>Add a Run</a>
	`;
  return charityHtml;
};
