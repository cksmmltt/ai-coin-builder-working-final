import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    size: '1.75',
    shape: 'Round',
    frontStyle: 'Soft Enamel',
    backStyle: 'Soft Enamel',
    finish: 'Polished Gold',
    edge: 'Standard',
    frontPrompt: '',
    backPrompt: '',
    quantity: 50
  });

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 30, fontFamily: 'Arial', maxWidth: 600, margin: 'auto' }}>
      <h1>AI Challenge Coin Builder</h1>
      <form onSubmit={handleSubmit}>
        <label>Size:</label>
        <select name="size" onChange={handleChange}>
          {[1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5].map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <label>Shape:</label>
        <select name="shape" onChange={handleChange}>
          <option>Round</option>
          <option>Die Cut</option>
        </select>

        <label>Front Style:</label>
        <select name="frontStyle" onChange={handleChange}>
          <option>Soft Enamel</option>
          <option>Hard Enamel</option>
          <option>Die Struck</option>
        </select>

        <label>Back Style:</label>
        <select name="backStyle" onChange={handleChange}>
          <option>Soft Enamel</option>
          <option>Hard Enamel</option>
          <option>Die Struck</option>
        </select>

        <label>Finish:</label>
        <select name="finish" onChange={handleChange}>
          <option>Polished Gold</option>
          <option>Polished Silver</option>
          <option>Antique Gold</option>
          <option>Antique Silver</option>
          <option>Black Nickel</option>
          <option>Copper</option>
          <option>Polished Nickel</option>
          <option>Polished Brass</option>
          <option>Super Antique Silver</option>
          <option>Super Antique Gold</option>
        </select>

        <label>Edge:</label>
        <select name="edge" onChange={handleChange}>
          <option>Standard</option>
          <option>Rope</option>
          <option>Spur</option>
          <option>Chain</option>
          <option>Scallop</option>
          <option>Oblique</option>
          <option>Cog</option>
          <option>Bevel</option>
          <option>Cross-Cut</option>
          <option>Reeded</option>
        </select>

        <label>Front Prompt:</label>
        <textarea name="frontPrompt" onChange={handleChange}></textarea>

        <label>Back Prompt:</label>
        <textarea name="backPrompt" onChange={handleChange}></textarea>

        <label>Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />

        <button type="submit">Generate Coin Images</button>
      </form>

      {result && (
        <div>
          <h2>Results</h2>
          <p><strong>Estimated Price:</strong> ${result.price}</p>
          <p><strong>Estimated Delivery:</strong> {result.delivery} days</p>
          <h3>Front Image</h3>
          <img src={result.frontImage} alt="Front" width="300" />
          <h3>Back Image</h3>
          <img src={result.backImage} alt="Back" width="300" />
        </div>
      )}
    </div>
  );
}
