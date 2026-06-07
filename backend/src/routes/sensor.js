const express = require("express");
const prisma = require("../lib/prisma");

const router = express.Router();

// ─── GET /api/sensor/kolam ────────────────────────────────────
// Ambil data terbaru sensor kolam lele
router.get("/kolam", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;

    const data = await prisma.sensorKolam.findMany({
      orderBy: { timestamp: "desc" },
      take: limit,
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Gagal mengambil data kolam" });
  }
});

// ─── GET /api/sensor/tanah ────────────────────────────────────
// Ambil data terbaru sensor tanah
router.get("/tanah", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;

    const data = await prisma.sensorTanah.findMany({
      orderBy: { timestamp: "desc" },
      take: limit,
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Gagal mengambil data tanah" });
  }
});

// ─── POST /api/sensor/kolam ───────────────────────────────────
// Endpoint untuk IoT device kirim data kolam
router.post("/kolam", async (req, res) => {
  try {
    const { deviceId, suhuAir, ph, dissolvedOxygen, tds } = req.body;

    const record = await prisma.sensorKolam.create({
      data: {
        deviceId,
        suhuAir,
        ph,
        dissolvedOxygen,
        tds,
        timestamp: new Date(),
      },
    });

    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Gagal menyimpan data kolam" });
  }
});

// ─── POST /api/sensor/tanah ───────────────────────────────────
// Endpoint untuk IoT device kirim data tanah
router.post("/tanah", async (req, res) => {
  try {
    const { deviceId, kelembabanTanah, suhuTanah, phTanah } = req.body;

    const record = await prisma.sensorTanah.create({
      data: {
        deviceId,
        kelembabanTanah,
        suhuTanah,
        phTanah,
        timestamp: new Date(),
      },
    });

    res.status(201).json({ success: true, data: record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Gagal menyimpan data tanah" });
  }
});

module.exports = router;
