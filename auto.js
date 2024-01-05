console.log("im summoned");
const GPT_KEY = "xxxx";

document.addEventListener("keydown", async function (event) {
  // capture ctrl+g
  if (event.ctrlKey && event.key == "g") {
    // prevent default behavior
    event.preventDefault();
    // get selected text
    const selection = window.getSelection();
    const text = selection.toString();

    // create a div for translation
    const div = document.createElement("div");
    div.style.position = "absolute";

    // get the bounding box of the selection
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // set the position of the div based on the selection's position and scroll position
    div.style.top = rect.top + window.scrollY - div.offsetHeight - 10 + "px";
    div.style.left = rect.left + "px";

    div.style.backgroundColor = "black";
    div.style.padding = "10px";
    div.style.color = "white";
    div.style.borderRadius = "5px";
    div.style.zIndex = "100000";
    div.style.fontFamily = "Arial";
    div.style.fontSize = "16px";
    div.style.fontWeight = "bold";

    // ask GPT to translate the text
    const response = await fetch(
      `https://api.openai.com/v1/engines/davinci/completions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GPT_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Translate from English to Turkish:\n\nEnglish: ${text}\nTurkish:`,
          max_tokens: 60,
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0.3,
          stop: ["\n"],
        }),
      }
    );

    const data = await response.json();
    div.innerHTML = data.choices[0].text;

    // append the translation div to the body
    document.body.appendChild(div);

    // remove the translation div after 2 seconds
    setTimeout(() => {
      document.body.removeChild(div);
    }, 2000);
  }
});
