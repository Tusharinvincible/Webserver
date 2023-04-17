function setResultText(txt) {
  document.querySelector(".display-result").textContent = txt;
}
document
  .querySelector(".Weather-input-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    // console.log("hit");
    const textInput = document.querySelector("input").value;

    fetch(`/weather?address=${textInput}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error("Invalid Address");
        } else {
          //console.log("hit", data.data);
          const outTemp = data.data.temperature;
          const inTemp = data.data.feelslike;
          console.log(outTemp);
          setResultText(
            `The outside temperature at ${textInput} is ${outTemp} But it feels like ${inTemp}`
          );
          return data;
        }
      })
      .catch((err) => {
        setResultText("Please enter the correct address!!!");
      });
  });
