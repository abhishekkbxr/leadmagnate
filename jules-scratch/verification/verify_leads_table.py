from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the login page
    page.goto("http://localhost:3000/authentication/login/cover")

    # Fill in the login form with the newly registered user's credentials
    page.get_by_placeholder("Email").fill("user_1728272178@example.com")
    page.get_by_placeholder("Password").fill("password123")

    # Click the login button
    page.get_by_role("button", name="Login").click()

    # Wait for navigation to the dashboard and then go to the leads page
    expect(page).to_have_url("http://localhost:3000/", timeout=20000)
    page.goto("http://localhost:3000/leads/list")

    # Wait for the table to be visible
    expect(page.get_by_role("table")).to_be_visible(timeout=10000)

    # Take a screenshot of the leads table
    page.screenshot(path="jules-scratch/verification/leads_table_verification.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)