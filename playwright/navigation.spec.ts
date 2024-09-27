import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Hello UpLeveled' }),
  ).toBeVisible();

  // header with page.locator, still valid and more robust
  await expect(page.locator('h1:text("Hello UpLeveled")')).toBeVisible();

  // test if images are visible
  await expect(
    page.getByRole('img', { name: /Smiling Cat/ }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Smiling Cat' }).nth(1),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'Smiling Cat' }).nth(2),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Accept' }).click();

  await page.getByRole('link', { name: 'Animals' }).click();
  await page.waitForURL('/animals');

  const animals = [
    {
      id: 1,
      firstName: 'Lucia',
      type: 'Lion',
      accessory: 'Car',
      birthDate: new Date('2020-10-23'),
    },
    {
      id: 2,
      firstName: 'Macca',
      type: 'Dog',
      accessory: 'Comb',
      birthDate: new Date('2020-10-20'),
    },
    {
      id: 3,
      firstName: 'Jojo',
      type: 'Dodo',
      accessory: 'Dojo',
      birthDate: new Date('2020-04-10'),
    },
    {
      id: 4,
      firstName: 'Flo',
      type: 'Parrot',
      accessory: 'carrot',
      birthDate: new Date('2020-06-12'),
    },
    {
      id: 5,
      firstName: 'Bili',
      type: 'Capybara',
      accessory: 'Pen',
      birthDate: new Date('2020-10-16'),
    },
  ];

  for (const animal of animals) {
    await expect(page.getByTestId(`animal-type-${animal.type}`)).toHaveText(
      animal.firstName,
    );
    await expect(
      page.getByRole('img', { name: animal.firstName }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: animal.firstName }),
    ).toBeVisible();
  }

  await page.getByRole('link', { name: 'Fruits' }).click();
  await page.waitForURL('/fruits');

  await page.getByRole('link', { name: '🍎 Apple' }).click();
  await page.waitForURL('/fruits/1');

  await page.getByRole('textbox').fill('This is a comment');
  await page.getByRole('button', { name: 'Add comment' }).click();

  await expect(
    page.locator('div').filter({ hasText: 'This is a comment' }),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Fruits' }).click();
  await page.waitForURL('/fruits');

  await expect(page.locator('h1')).toHaveText('Fruits');

  await expect(
    page.locator(
      'div:has(a:has-text("Apple")) >> div:has-text("This is a comment")',
    ),
  ).toBeVisible();
});
