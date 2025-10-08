import re
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Log in
        page.goto("http://localhost:3000/authentication/login/cover")
        page.get_by_placeholder("Email").fill("abhishekbxr203@gmail.com")
        page.get_by_placeholder("Password").fill("123456")

        # Click and wait for navigation to complete
        with page.expect_navigation(wait_until="networkidle"):
            page.get_by_role("button", name="LOGIN").click()

        # Verify redirection by checking for an element on the dashboard
        expect(page.get_by_text("Welcome to Duralux")).to_be_visible()

        # 2. Navigate to Organisations
        page.get_by_role("link", name="organisations").click()
        expect(page).to_have_url(re.compile(r".*/organisations/list"))
        page.screenshot(path="jules-scratch/verification/organisations_list.png")

        # 3. Create a new organisation
        page.get_by_role("link", name="Create Organisation").click()
        expect(page).to_have_url(re.compile(r".*/organisations/create"))

        page.get_by_label("Organisation Name").fill("Test Organisation")
        page.get_by_label("Organisation Email").fill("test@test.com")
        page.get_by_label("Organisation Phone").fill("1234567890")
        page.get_by_role("button", name="Create Organisation").click()

        # 4. Verify the new organisation in the list
        expect(page.get_by_text("Organisation created successfully")).to_be_visible()
        page.goto("http://localhost:3000/organisations/list")
        expect(page.get_by_text("Test Organisation")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/verification.png")

    except Exception as e:
        page.screenshot(path="jules-scratch/verification/error.png")
        print(f"An error occurred: {e}")
        raise e
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)