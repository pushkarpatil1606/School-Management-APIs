function toTrimmedString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function toNumber(value) {
  if (value === null || value === undefined || value === '') return Number.NaN;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export function validateSchoolPayload(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, message: 'Request body must be a JSON object.' };
  }

  const name = toTrimmedString(body.name);
  const address = toTrimmedString(body.address);
  const latitude = toNumber(body.latitude);
  const longitude = toNumber(body.longitude);

  if (!name || !address) {
    return { ok: false, message: 'name and address are required.' };
  }

  if (name.length > 255) {
    return { ok: false, message: 'name must be 255 characters or less.' };
  }

  if (address.length > 500) {
    return { ok: false, message: 'address must be 500 characters or less.' };
  }

  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
    return { ok: false, message: 'latitude must be a number between -90 and 90.' };
  }

  if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
    return { ok: false, message: 'longitude must be a number between -180 and 180.' };
  }

  return {
    ok: true,
    data: {
      name,
      address,
      latitude,
      longitude
    }
  };
}

export function validateCoordinates(latitudeValue, longitudeValue) {
  const latitude = toNumber(latitudeValue);
  const longitude = toNumber(longitudeValue);

  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
    return { ok: false, message: 'Query parameter latitude must be a valid number between -90 and 90.' };
  }

  if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
    return { ok: false, message: 'Query parameter longitude must be a valid number between -180 and 180.' };
  }

  return { ok: true, data: { latitude, longitude } };
}
