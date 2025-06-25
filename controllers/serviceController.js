// controllers/serviceController.js
const Service = require('../models/Service');
const Personnel = require('../models/Personnel');

// Δημιουργία νέας υπηρεσίας
exports.createService = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newService = new Service({ name, description });
    await newService.save();
    res.status(201).json(newService);  // Επιστροφή του νέου αντικειμένου υπηρεσίας
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Πρόσθεση στρατιωτικού προσωπικού σε υπηρεσία
exports.addPersonnelToService = async (req, res) => {
  const { serviceId, personnelId } = req.body;
  try {
    const service = await Service.findById(serviceId);
    const personnel = await Personnel.findById(personnelId);

    if (!service || !personnel) {
      return res.status(404).json({ message: 'Service or Personnel not found' });
    }

    if (!service.personnel) {
      service.personnel = [];
    }

    if (!service.personnel.includes(personnel._id)) {
      service.personnel.push(personnel._id);
      await service.save();
    }

    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Αφαίρεση στρατιωτικού προσωπικού από υπηρεσία
exports.removePersonnelFromService = async (req, res) => {
  const { serviceId, personnelId } = req.body;

  try {
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (!service.personnel) {
      return res.status(400).json({ message: 'No personnel in this service' });
    }

    service.personnel = service.personnel.filter(id => id.toString() !== personnelId);
    await service.save();

    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
