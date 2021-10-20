function pass() {
  var n1 = Number(document.getElementById("grade-subject1").value);
  var n2 = Number(document.getElementById("grade-subject2").value);
  var n3 = Number(document.getElementById("grade-subject3").value);
  if (n1 == 0 || n2 == 0 || n3 == 0) {
    document.getElementById("txtResult").innerHTML =
      "Bạn đã rớt. Do có điểm nhỏ hơn hoặc bằng 0";
    return;
  }
  function locate() {
    switch (document.getElementById("location").value) {
      case "A":
        return 2;
      case "B":
        return 1;
      case "C":
        return 0.5;
      default:
        return 0;
    }
  }
  function objects() {
    switch (document.getElementById("object").value) {
      case 1:
        return 2.5;
      case 2:
        return 1.5;
      case 3:
        return 1;
      default:
        return 0;
    }
  }
  var uutien = locate() + objects();
  var tongket = n1 + n2 + n3 + uutien;
  var chuan = document.getElementById("grade-standard").value;

  if (tongket >= chuan) {
    document.getElementById("txtResult").innerHTML =
      "Bạn đã đậu. Tổng điểm: " + tongket;
    return;
  }

  document.getElementById("txtResult").innerHTML =
    "Bạn đã rớt. Tổng điểm: " + tongket;
}

function electBill() {
  const kW1 = 50;
  const kW2 = 50;
  const kW3 = 100;
  const kW4 = 150;
  const price_kW1 = 500;
  const price_kW2 = 650;
  const price_kW3 = 850;
  const price_kW4 = 1100;
  const price_kWf = 1300;
  var ten = document.getElementById("fullName").value;
  var n = document.getElementById("kW").value;
  if (n <= 0) {
    alert("Số kW không hợp lệ! Vui lòng nhập lại");
    return;
  }
  var bill = 0;
  if (n <= kW1) {
    bill = n * price_kW1;
  } else if (n <= kW1 + kW2) {
    bill = kW1 * price_kW1 + (n - kW1) * price_kW2;
  } else if (n <= kW1 + kW2 + kW3) {
    bill = kW1 * price_kW1 + kW2 * price_kW2 + (n - kW1 - kW2) * price_kW3;
  } else if (n <= kW1 + kW2 + kW3 + kW4) {
    bill =
      kW1 * price_kW1 +
      kW2 * price_kW2 +
      kW3 * price_kW3 +
      (n - kW1 - kW2 - kW3) * price_kW4;
  } else
    bill =
      kW1 * price_kW1 +
      kW2 * price_kW2 +
      kW3 * price_kW3 +
      kW4 * price_kW4 +
      (n - kW1 - kW2 - kW3 - kW4) * price_kWf;

  document.getElementById("txtElectBill").innerHTML =
    "Họ tên: " + ten + "; Tiền điện: " + Intl.NumberFormat().format(bill);
}

function taxFee() {
  const RATE1 = 0.05;
  const RATE2 = 0.1;
  const RATE3 = 0.15;
  const RATE4 = 0.2;
  const RATE5 = 0.25;
  const RATE6 = 0.3;
  const RATE7 = 0.35;
  var name = document.getElementById("fullName-input").value;
  var income = document.getElementById("incomeAnnual").value;
  var mem = document.getElementById("member").value;
  var IBT = income - 4 * Math.pow(10, 6) - mem * 1.6 * Math.pow(10, 6);
  var IAT = 0;
  if (IBT <= 60 * Math.pow(10, 6)) {
    IAT = IBT * RATE1;
  } else if (IBT <= 120 * Math.pow(10, 6)) {
    IAT = IBT * RATE2;
  } else if (IBT <= 210 * Math.pow(10, 6)) {
    IAT = IBT * RATE3;
  } else if (IBT <= 384 * Math.pow(10, 6)) {
    IAT = IBT * RATE4;
  } else if (IBT <= 624 * Math.pow(10, 6)) {
    IAT = IBT * RATE5;
  } else if (IBT <= 960 * Math.pow(10, 6)) {
    IAT = IBT * RATE6;
  } else IAT = IBT * RATE7;
  document.getElementById("txtTaxFee").innerHTML =
    "Họ tên: " +
    name +
    "; Tiền thuế thu nhập cá nhân: " +
    Intl.NumberFormat("de-DE").format(IAT) +
    " VND";
}

function Netfee() {
  var id = document.getElementById("idCustomer").value;
  var type = document.getElementById("cust").value;
  var a = document.getElementById("channel").value;
  var bill = 0;
  if (type == "ND") {
    const RECEIPT = 4.5;
    const SERVICE = 20.5;
    const PREMIUM = 7.5;
    bill = RECEIPT + SERVICE + PREMIUM * a;
  } else if (type == "DN") {
    const RECEIPT = 15;
    const SERVICE_stPrice = 75;
    const SERVICE_ndPrice = 5;
    const PREMIUM = 50;
    var b = document.getElementById("connect").value;
    var bill = RECEIPT + PREMIUM * a + SERVICE_stPrice;
    if (b > 10) {
      bill += (b - 10) * SERVICE_ndPrice;
    }
  }
  document.getElementById("txtNet").innerHTML =
    "Mã khách hàng: " +
    id +
    "; Tiền cáp: $" +
    Intl.NumberFormat("en-IN").format(bill);
}

function disableInput() {
  var n = document.getElementById("cust").value;
  if (n == "DN") {
    document.getElementById("connect").style.cssText = "display:invisible";
  } else {
    document.getElementById("connect").style.cssText = "display:none";
  }
}
document.getElementById("btnResult").onclick = pass;

document.getElementById("btnElectBill").addEventListener("click", electBill);

document.getElementById("btnTaxFee").onclick = function () {
  taxFee();
};
