// Variable to receive orders
var newPerson;

// Sum the values in an array
function getSum(total, num) {
    return total + num;
};

// diner object to copy orders
function diner() {
    this.name = "";
    this.app = "";
    this.entree = "";
    this.dessert = "";
};

// Returns the food costs for diner
diner.prototype.meal = function() {
    var meal = parseFloat(this.app) + parseFloat(this.entree) + parseFloat(this.dessert);
    return meal;
};

// Returns the tax for the diner's meal
diner.prototype.tax = function() {
    var mealtax = (parseFloat(this.app) + parseFloat(this.entree) + parseFloat(this.dessert))*.0625;
    return mealtax
};

// Returns the tip amount on diner's meal, including tax
diner.prototype.tip = function() {
    var subtotal = this.meal() + this.tax();
    var tip = subtotal*.18;
    return parseFloat(tip);
};

// Returns the total of the diner's order, including meal, tax, and tip
diner.prototype.dinertotal = function() {
    var dinertotal = this.meal() + this.tax() + this.tip();
    return parseFloat(dinertotal);
};


// bill object to collect each diner's order
var bill = {
    diners: [],
    dinersmeals: [],
    dinerstip: [],
    dinerstotal: [],
};

// The total amount in tips
bill.waitresstotal = function() {
  var waitresstotal = this.dinerstip.reduce(getSum);
  return waitresstotal;
};

// The grand total of all the diner's orders
bill.grandtotal = function() {
  var grandtotal = this.dinerstotal.reduce(getSum);
  return grandtotal;
};

// Cost for each individual if bill is split evenly
bill.splitbill = function() {
  var people = this.diners.length;
  var splitbill = this.grandtotal()/people;
  splitbill += .01;
  if (bill.diners.length == 1) {
    return "----";
  };
  return parseFloat(splitbill).toFixed(2);
};

// Facilitate each diner's orders
function collectOrders() {
  var name = $('#name');
  var app = $("#app");
  var entree = $("#entree");
  var dessert = $("#dessert");
  newPerson = new diner();
  newPerson.name = name.val();
  newPerson.app = app.val();
  newPerson.entree = entree.val();
  newPerson.dessert = dessert.val();
  console.log(newPerson);
};

// Print each diner's order on the screen
function listOrders() {
  var dinerbox = $(".template .tickets").clone();

  var appendname = dinerbox.find(".dinername");
  appendname.text(newPerson.name);

  var appendapp = dinerbox.find(".dinerapp");
  appendapp.text(newPerson.app);

  var appendentree = dinerbox.find(".dinerentree");
  appendentree.text(newPerson.entree);

  var appenddessert = dinerbox.find(".dinerdessert");
  appenddessert.text(newPerson.entree);

  console.log(dinerbox);
  dinerbox.appendTo("#list-tickets");
  
};

// Add each order to the bill
function addToBill() {
    bill.diners.push(newPerson.name);
    bill.dinersmeals.push(newPerson.meal() + newPerson.tax());
    bill.dinerstip.push(newPerson.tip());
    bill.dinerstotal.push(newPerson.dinertotal());
    console.log(bill);
};

// Clear form fields after each order submission
function clearInput() {
  $("#name").val("");
  $("#app").val("");
  $("#entree").val("");
  $("#dessert").val("");
};
 
$(document).ready(function() {
  var html = "";
  $("#bill").hide()


  // Submit person's order
  $("#orderbutton").click(function(event){
    event.preventDefault();

    // Require all input fields be filled before submission
    if ($("#name").val() == "" || $("#app").val() == "" || $("#entree").val() == "" || $("#dessert").val() == "") {
      return false
    };
    collectOrders();
    listOrders();
    addToBill();
    clearInput();    
  });


  $("#calculate").click(function() {
    if (bill.diners.length === 0){
      return false;
    };
    var html2 = "";
    $("#orderform").hide();
    $("#bill").show()
    html2 += "<p>" + "--------------------------------" + "</p>";
    html2 += "<p>" + "Thank you for eating at Bob's Burgers" + "</p>";
    html2 += "<p>" + "--------------------------------" + "</p>";

    // Print out each of the orders collected on the bill
    for ( var i = 0; i < bill.diners.length; i++) {
      html2 += "<p>" + "Name: " + bill.diners[i] + "</p>"
      html2 += "<p>" + "Meal Cost: $" + bill.dinersmeals[i].toFixed(2) + "</p>";
      html2 += "<p>" + "Tip Amount: $" + bill.dinerstip[i].toFixed(2) + "</p>";
      html2 += "<p>" + bill.diners[i] + "'s Total: $" + bill.dinerstotal[i].toFixed(2) + "</p>";
      html2 += "<p>" + "--------------------------------" + "</p>";
    };
    html2 += "<p>" + "Tax is 6.25% in the state of MA" + "</p>";
    html2 += "<p>" + "Tip has been calculated at 18%" + "</p>";

    // Print total in tips
    html2 += "<p>" + "Tip for Waitress Louise: $" + bill.waitresstotal().toFixed(2) + "</p>";
    
    // Print grand total of the orders
    html2 += "<p>" + "Grand Total: $" + bill.grandtotal().toFixed(2) + "</p>";
    
    // Print the cost per person if they split the bill
    html2 += "<p>" + "Split Bill: $" + bill.splitbill() + " per person" + "</p>";

    // Display the bill
    $("#bill").append(html2);

  });

  $("#reset").click(function() {
    location.reload();
  });
  
})
