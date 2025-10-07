from playwright.sync_api import sync_playwright, Page, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the registration page
    page.goto("http://localhost:3000/authentication/register/cover")

    # Generate unique user data
    timestamp = int(time.time())
    unique_email = f"user_{timestamp}@example.com"
    password = "password123"

    # Fill in the registration form
    page.get_by_placeholder("Full Name").fill("Test User")
    page.get_by_placeholder("Email").fill(unique_email)
    page.get_by_placeholder("Phone").fill("1234567890")
    page.get_by_placeholder("Password", exact=True).fill(password)
    page.get_by_placeholder("Password again").fill(password)

    # Accept terms and conditions by clicking the labels
    page.locator("label[for='receiveMial']").click()
    page.locator("label[for='termsCondition']").click()

    # Click the create account button
    page.get_by_role("button", name="Create Account").click()

    try:
        # Wait for navigation to the verification page
        expect(page).to_have_url(f"http://localhost:3000/authentication/verify/cover?email={unique_email}", timeout=15000)

        print(f"Successfully registered user with email: {unique_email}")
        print(f"Password: {password}")

    except Exception as e:
        print("Registration probably failed. Taking a screenshot.")
        page.screenshot(path="jules-scratch/verification/registration_failure.png")
        print("Screenshot saved to jules-scratch/verification/registration_failure.png")
        raise e

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)