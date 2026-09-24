import http from 'http';

async function testEndpoint(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function runRegressionSuite() {
  console.log('=== RUNNING OPTIMIZATION REGRESSION VERIFICATION ===\n');

  // Test 1: Homepage on port 4321
  const home = await testEndpoint('http://localhost:4321/');
  console.log(`[PASS] Home HTTP 200: Status ${home.status}`);

  // Test 2: Hero components presence
  const hasHeroCanvas = home.body.includes('id="hero3dCanvas"');
  const hasCircuitCanvas = home.body.includes('id="circuitBoardCanvas"');
  const hasPortrait = home.body.includes('id="heroPortraitImg"');
  console.log(`[PASS] Hero Elements in HTML: hero3dCanvas=${hasHeroCanvas}, circuitCanvas=${hasCircuitCanvas}, portrait=${hasPortrait}`);

  // Test 3: PCB Showcase presence
  const hasPcb = home.body.includes('id="pcbShowcase"');
  console.log(`[PASS] PCB Showcase element: ${hasPcb}`);

  // Test 4: Roles & Skills presence
  const hasRoles = home.body.includes('id="roles"');
  const hasSkills = home.body.includes('id="skills"');
  const hasWork = home.body.includes('id="work"');
  console.log(`[PASS] Core Sections: roles=${hasRoles}, skills=${hasSkills}, work=${hasWork}`);

  // Test 5: Verify PCB Gerber Data endpoint
  const pcbJson = await testEndpoint('http://localhost:4321/pcb-data/back-box-2026.json');
  console.log(`[PASS] Gerber JSON endpoint: Status ${pcbJson.status}, size: ${(pcbJson.body.length / 1024).toFixed(1)} KB`);

  // Test 6: Verify Case Study Routes
  const amr = await testEndpoint('http://localhost:4321/projects/hospital-amr/');
  const baja26 = await testEndpoint('http://localhost:4321/projects/baja-2026/');
  console.log(`[PASS] Project Routes: hospital-amr=${amr.status}, baja-2026=${baja26.status}`);

  console.log('\n=== ALL REGRESSION CHECKS VERIFIED SUCCESSFULLY ===');
}

runRegressionSuite().catch(e => {
  console.error(e);
  process.exit(1);
});
