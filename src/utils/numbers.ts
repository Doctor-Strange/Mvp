function numberWithCommas(x) {
  return x
    .toString()
    .replace(',', '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function convertNumbers2Persian(num) {
  if (num !== null && num !== undefined) {
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/[0-9]/g, function(w) {
      return id[+w];
    });
  } else {
    return num;
  }
}

function convertNumbers2English(string) {
  return string
    .replace(/[\u0660-\u0669]/g, c => {
      return c.charCodeAt(0) - 0x0660;
    })
    .replace(/[\u06f0-\u06f9]/g, c => {
      return c.charCodeAt(0) - 0x06f0;
    });
}

function getShortVersion(num) {
  let number;
  let unit;
  if (num <= 999) {
    number = num;
    unit = '';
  } else if (num >= 1000 && num <= 999999) {
    number = num / 1000.0;
    unit = 'هزار';
  } else if (num >= 1000000 && num <= 999999999) {
    number = num / 1000000.0;
    unit = 'میلیون';
  }
  return { number, unit };
}

export {
  numberWithCommas,
  convertNumbers2Persian,
  convertNumbers2English,
  getShortVersion
};
