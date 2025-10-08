import re
from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Log in
    page.goto("http://localhost:3000/authentication/login/cover")
    page.get_by_placeholder("Email").fill("abhishekbxr203@gmail.com")
    page.get_by_placeholder("Password").fill("123456")
    page.get_by_role("button", name="Login").click()

    # Wait for successful login and redirection to the dashboard
    expect(page).to_have_url("http://localhost:3000/", timeout=15000)

    # Now navigate to the leads page
    page.goto("http://localhost:3000/leads/list")

    # Wait for the table to be visible
    expect(page.locator(".table")).to_be_visible(timeout=15000)

    # Take a screenshot of the leads table
    page.screenshot(path="jules-scratch/verification/leads_table_verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)