var newPerson;

function getSum(total, num) {
    return total + num;
};

function diner() {
    this.name = "";
    this.app = "";
    this.entree = "";
    this.dessert = "";
};

diner.prototype.meal = function() {
    var meal = parseFloat(this.app) + parseFloat(this.entree) + parseFloat(this.dessert);
    return meal;
};

diner.prototype.tax = function() {
    var mealtax = (parseFloat(this.app) + parseFloat(this.entree) + parseFloat(this.dessert))*.0675;
    return mealtax
};

diner.prototype.tip = function() {
    var subtotal = this.meal() + this.tax();
    var tip = subtotal*.18;
    return parseFloat(tip);
};

diner.prototype.dinertotal = function() {
    var dinertotal = this.meal() + this.tax() + this.tip();
    return parseFloat(dinertotal);
};


var bill = {
    diners: [],
    dinersmeals: [],
    dinerstip: [],
    dinerstotal: [],
};

bill.waitresstotal = function() {
  var waitresstotal = this.dinerstip.reduce(getSum);
  return waitresstotal;
};

bill.grandtotal = function() {
  var grandtotal = this.dinerstotal.reduce(getSum);
  return grandtotal;
};

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

function listOrders() {
  var dinerbox = $("section.tickets").clone();

  var appendname = dinerbox.find(".dinername");
  appendname.text(newPerson.name);

  var appendapp = dinerbox.find(".dinerapp");
  appendapp.text(newPerson.app);

  return dinerbox;
};

function addToBill() {
    bill.diners.push(newPerson.name);
    bill.dinersmeals.push(newPerson.meal() + newPerson.tax());
    bill.dinerstip.push(newPerson.tip());
    bill.dinerstotal.push(newPerson.dinertotal());
    console.log(bill);
};

function clearInput() {
  $("#name").val("");
  $("#app").val("");
  $("#entree").val("");
  $("#dessert").val("");
};
 
$(document).ready(function() {
  var html = "";
  $("#bill").hide()

  $("#orderbutton").click(function(event){
    event.preventDefault();
    console.log("this button works");
    collectOrders();
    listOrders();
    addToBill();
    clearInput();
      
  });


  $("#calculate").click(function() {
    var html2 = "";
    var grandtotal ="";
    var waitress = "";
    $("#orderform").hide();
    $("#bill").show()
    html2 += "<p>" + "--------------------------------" + "</p>";
    html2 += "<p>" + "Thank you for eating at Bob's Burgers" + "</p>";
    for ( var i = 0; i < bill.diners.length; i++) {
      html2 += "<p>" + "Name: " + bill.diners[i] + "</p>"
      html2 += "<p>" + "Meal Cost: $" + bill.dinersmeals[i].toFixed(2) + "</p>";
      html2 += "<p>" + "Tip Amount: $" + bill.dinerstip[i].toFixed(2) + "</p>";
      html2 += "<p>" + bill.diners[i] + "'s Total: $" + bill.dinerstotal[i].toFixed(2) + "</p>";
      html2 += "<p>" + "-----------------" + "</p>";
    };
    html2 += "<p>" + "Tip for Waitress Louise: $" + bill.waitresstotal().toFixed(2) + "</p>";
    html2 += "<p>" + "Grand Total: $" + bill.grandtotal().toFixed(2) + "</p>";
    $("#bill").append(html2);
  });

  $("#reset").click(function() {
    location.reload();
  });
  
})
