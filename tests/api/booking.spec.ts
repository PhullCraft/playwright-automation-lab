import { test, expect } from '@playwright/test';

test('API health check - ping', async ({ request }) => {
  const response = await request.get("https://restful-booker.herokuapp.com/ping");
  expect(response.status()).toBe(201);
});

test("Get all booking IDs returns a list", async({request})=>{
  const response = await request.get("https://restful-booker.herokuapp.com/booking");
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});

test ("GET single booking by ID returns full details", async({request})=>{
  const listResponse = await request.get("https://restful-booker.herokuapp.com/booking");
  const bookings = await listResponse.json();
  const firstBookingId = bookings[0].bookingid;
  //console.log(firstBookingId);
  const response = await request.get(`https://restful-booker.herokuapp.com/booking/${firstBookingId}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('firstname');
  expect(body).toHaveProperty('lastname');
  expect(body).toHaveProperty('totalprice');
});

test('POST /auth returns a valid token', async ({ request }) => {
  const response = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: 'admin',
      password: 'password123',
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('token');
});

test('POST /booking creates a new booking', async ({ request }) => {
  const newBooking = {
    firstname: 'Amar',
    lastname: 'Phull',
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-08-01',
      checkout: '2026-08-05',
    },
    additionalneeds: 'Breakfast',
  };

  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    data: newBooking,
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('bookingid');
  expect(body.booking.firstname).toBe('Amar');
  expect(body.booking.lastname).toBe('Phull');
  expect(body.booking.totalprice).toBe(150);
});

test('PUT /booking updates a booking using auth token', async ({ request }) => {
  // Step 1: Get a token
  const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
    data: {
      username: 'admin',
      password: 'password123',
    },
  });
  const authBody = await authResponse.json();
  const token = authBody.token;

  // Step 2: Get a real booking ID to update
  const listResponse = await request.get('https://restful-booker.herokuapp.com/booking');
  const bookings = await listResponse.json();
  const bookingId = bookings[0].bookingid;

  // Step 3: Update that booking, using the token
  const updateResponse = await request.put(
    `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
      data: {
        firstname: 'UpdatedFirstName',
        lastname: 'UpdatedLastName',
        totalprice: 999,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-09-01',
          checkout: '2026-09-05',
        },
        additionalneeds: 'Late checkout',
      },
    }
  );

  expect(updateResponse.status()).toBe(200);

  const updatedBody = await updateResponse.json();
  expect(updatedBody.firstname).toBe('UpdatedFirstName');
  expect(updatedBody.totalprice).toBe(999);
});