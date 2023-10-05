const submitAction = document.getElementById("formDataDiri");

submitAction.addEventListener("submit", (e) => {
  const inputNama = document.getElementById("inputNama").value;
  const inputDomisili = document.getElementById("inputDomisili").value;
  const hiddenMessage = `Halo, ${inputNama}. Bagaimana cuaca di ${inputDomisili}?`;

  document.getElementById("messageAfterSubmit").innerText = hiddenMessage;
  e.preventDefault() // mencegah web refresh halaman
});
