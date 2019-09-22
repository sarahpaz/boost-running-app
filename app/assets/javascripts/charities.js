//****** Document ready
$(() => {
  charityClickHandler();
});

const charityClickHandler = () => {
  $(".charities").on("click", e => {
    e.preventDefault(); //* prevent default behavior
    // alert("test");
    history.pushState(null, null, "/charities"); //* change url to appear as /charities
    fetch("/charities.json") //* fetch requests returns a promise
      .then(res => res.json()) //* when a promise is resolved with a value you can add .then method
      .then(charities => {
        $("#app-container").empty().append(`
						<h2>Participating Charities</h2>
						<p>Our list continues to grow as runners add charities they are passionate about. If you've got a charity in mind that isn't listed, add it below!</p>
					`);

        charities.forEach(charity => {
          let newCharity = new Charity(charity);
          let charityHtml = newCharity.formatIndex();
          $("#app-container").append(charityHtml); //* id container in application.html.erb (layouts)
        });
      });
  });

  $(document).on("click", ".show-link", function(e) {
    e.preventDefault();
    // alert("test");
    $("#app-container").empty();
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

//****** Constructor functions
class Charity {
  constructor(charity) {
    this.name = charity.name;
    this.description = charity.description;
    this.id = charity.id;
    this.runs = charity.runs;
  }
}

//****** Prototype functions
Charity.prototype.formatIndex = function() {
  //* can't use arrow functions for prototype methods
  let charityHtml = `
		<ul>
			<li><a href='/charities/${this.id}' class="show-link" data-id='${this.id}'>${this.name}</a></li>
			<p>${this.description}</p>
		</ul>
	`;
  return charityHtml;
};

Charity.prototype.formatShow = function() {
  //* can't use arrow functions for prototype methods
  let charityHtml = `
		<h2>${this.name}</h2>
		<p>${this.description}</p>
	`;
  return charityHtml;
};
