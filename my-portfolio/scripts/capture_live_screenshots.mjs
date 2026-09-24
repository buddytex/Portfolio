
    const { firefox } = await import("playwright");
    const browser = await firefox.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto("http://localhost:4322/");
    await page.waitForTimeout(1500);
    
    // Screenshot 1: Hero
    await page.screenshot({ path: "hero_live_verified.png" });
    
    // Scroll down to projects
    await page.evaluate(() => window.scrollTo(0, 1100));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "projects_live_verified.png" });
    
    // Scroll back to Hero to verify return
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "hero_returned_verified.png" });
    
    // Scroll to PCB section
    const pcb = await page.$("#hardware");
    if (pcb) {
      await pcb.scrollIntoViewIfNeeded();
      await page.waitForTimeout(2000);
      await page.screenshot({ path: "pcb_showcase_verified.png" });
    }
    
    // Visit a project detail page
    await page.goto("http://localhost:4322/projects/baja-2026");
    await page.waitForTimeout(1500);
    await page.screenshot({ path: "project_detail_verified.png" });
    
    await browser.close();
    console.log("Screenshots saved successfully!");
  