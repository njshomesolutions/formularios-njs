const useState = React.useState;

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx6nh-N2bdfrGmzGmFlBriyN0epGhpQ39JhHt9VGKG9OeTl6beJr8YAqMXhh1NgzcE/exec";

const jobs = {
  "Install new flooring": [
    { label: "Floor type", type: "select", options: ["Ceramic", "Hardwood", "Vinyl", "Porcelain", "Marble", "Granite"] },
    { label: "Room / Area", type: "text" },
    { label: "Square footage", type: "number" },
    { label: "Color or material reference", type: "text" },
    { label: "Includes removal of existing floor", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Remove existing flooring": [
    { label: "Floor type to remove", type: "select", options: ["Ceramic", "Hardwood", "Vinyl", "Porcelain", "Concrete", "Other"] },
    { label: "Room / Area", type: "text" },
    { label: "Square footage", type: "number" },
    { label: "Debris disposal", type: "select", options: ["Client handles", "NJS handles"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair damaged flooring": [
    { label: "Floor type", type: "select", options: ["Ceramic", "Hardwood", "Vinyl", "Porcelain", "Other"] },
    { label: "Room / Area", type: "text" },
    { label: "Damage description", type: "textarea" },
    { label: "Affected square footage", type: "number" },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Sand and refinish hardwood floor": [
    { label: "Room / Area", type: "text" },
    { label: "Square footage", type: "number" },
    { label: "Finish type", type: "select", options: ["Matte", "Satin", "Gloss"] },
    { label: "Number of coats", type: "number" },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Paint walls": [
    { label: "Room / Area", type: "text" },
    { label: "Square footage", type: "number" },
    { label: "Paint color", type: "text" },
    { label: "Paint brand", type: "text" },
    { label: "Number of coats", type: "select", options: ["1", "2", "3"] },
    { label: "Includes surface prep", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install wallpaper": [
    { label: "Room / Area", type: "text" },
    { label: "Square footage", type: "number" },
    { label: "Wallpaper reference or design", type: "text" },
    { label: "Wallpaper material", type: "select", options: ["Vinyl", "Fabric", "Paper", "Natural fiber"] },
    { label: "Includes removal of old wallpaper", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install wall cladding": [
    { label: "Room / Area", type: "text" },
    { label: "Cladding type", type: "select", options: ["Stone", "Wood", "PVC panel", "Decorative brick", "Other"] },
    { label: "Square footage", type: "number" },
    { label: "Color or reference", type: "text" },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair wall crack": [
    { label: "Exact location", type: "text" },
    { label: "Crack length (inches)", type: "number" },
    { label: "Estimated depth", type: "select", options: ["Surface", "Moderate", "Deep"] },
    { label: "Repair material", type: "select", options: ["Spackle", "Cement", "Plaster", "Other"] },
    { label: "Requires painting after repair", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair wall hole": [
    { label: "Exact location", type: "text" },
    { label: "Hole size (inches)", type: "number" },
    { label: "Wall type", type: "select", options: ["Concrete", "Drywall", "Brick", "Other"] },
    { label: "Repair material", type: "select", options: ["Spackle", "Drywall patch", "Cement", "Other"] },
    { label: "Requires painting after repair", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install drywall": [
    { label: "Room / Area", type: "text" },
    { label: "Square footage", type: "number" },
    { label: "Purpose", type: "select", options: ["Room divider", "Ceiling", "Wall cladding", "Other"] },
    { label: "Drywall type", type: "select", options: ["Standard", "Moisture resistant", "Fire resistant"] },
    { label: "Includes painting", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Paint ceiling": [
    { label: "Room / Area", type: "text" },
    { label: "Square footage", type: "number" },
    { label: "Paint color", type: "text" },
    { label: "Number of coats", type: "select", options: ["1", "2", "3"] },
    { label: "Includes surface prep", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair roof leak": [
    { label: "Exact location", type: "text" },
    { label: "Identified cause", type: "select", options: ["Ceiling crack", "Broken pipe", "Waterproofing failure", "Unknown"] },
    { label: "Affected area (sq ft)", type: "number" },
    { label: "Repair material", type: "select", options: ["Waterproof sealant", "Cement", "Membrane", "Other"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install drop ceiling": [
    { label: "Room / Area", type: "text" },
    { label: "Square footage", type: "number" },
    { label: "Ceiling material", type: "select", options: ["Drywall", "PVC", "Mineral fiber", "Wood", "Other"] },
    { label: "Height from floor (ft)", type: "number" },
    { label: "Includes lighting", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair ceiling crack": [
    { label: "Exact location", type: "text" },
    { label: "Crack length (inches)", type: "number" },
    { label: "Estimated depth", type: "select", options: ["Surface", "Moderate", "Deep"] },
    { label: "Repair material", type: "select", options: ["Spackle", "Cement", "Plaster", "Other"] },
    { label: "Requires painting after repair", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install recessed lighting": [
    { label: "Room / Area", type: "text" },
    { label: "Number of light fixtures", type: "number" },
    { label: "Bulb type", type: "select", options: ["LED", "Halogen", "Fluorescent", "Other"] },
    { label: "Requires additional electrical work", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Full bathroom renovation": [
    { label: "Bathroom size (sq ft)", type: "number" },
    { label: "Scope of work", type: "select", options: ["Floor + walls + fixtures", "Floor and walls only", "Fixtures only", "Full including plumbing"] },
    { label: "New floor type", type: "select", options: ["Ceramic", "Porcelain", "Marble", "Other"] },
    { label: "Style or color scheme", type: "text" },
    { label: "Includes pipe replacement", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Replace toilet": [
    { label: "New brand or model", type: "text" },
    { label: "Toilet type", type: "select", options: ["Standard", "Elongated", "Wall-mounted", "Smart"] },
    { label: "Includes removal of old unit", type: "select", options: ["Yes", "No"] },
    { label: "Requires plumbing adjustment", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Replace shower or bathtub": [
    { label: "Type", type: "select", options: ["Shower", "Bathtub", "Shower and bathtub"] },
    { label: "New brand or model", type: "text" },
    { label: "Includes removal of old unit", type: "select", options: ["Yes", "No"] },
    { label: "Requires plumbing adjustment", type: "select", options: ["Yes", "No"] },
    { label: "Includes tile installation", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Replace sink": [
    { label: "Sink type", type: "select", options: ["Vessel", "Undermount", "Pedestal", "Wall-mounted"] },
    { label: "New brand or model", type: "text" },
    { label: "Includes faucet", type: "select", options: ["Yes", "No"] },
    { label: "Includes removal of old unit", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install or repair bathroom tiles": [
    { label: "Room / Area", type: "text" },
    { label: "Square footage", type: "number" },
    { label: "Work type", type: "select", options: ["New installation", "Repair", "Partial replacement"] },
    { label: "Tile reference", type: "text" },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair bathroom plumbing": [
    { label: "Issue type", type: "select", options: ["Leak", "Broken pipe", "Clog", "Corrosion", "Other"] },
    { label: "Exact location", type: "text" },
    { label: "Pipe material", type: "select", options: ["PVC", "Copper", "Galvanized", "Other"] },
    { label: "Requires opening wall or floor", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Full kitchen renovation": [
    { label: "Kitchen size (sq ft)", type: "number" },
    { label: "Scope of work", type: "select", options: ["Cabinets + countertop + floor", "Cabinets only", "Floor and walls only", "Full including plumbing and electrical"] },
    { label: "Desired style", type: "text" },
    { label: "Includes pipe replacement", type: "select", options: ["Yes", "No"] },
    { label: "Includes electrical work", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install cabinets": [
    { label: "Number of cabinets", type: "number" },
    { label: "Material", type: "select", options: ["MDF", "Solid wood", "Melamine", "Aluminum", "Other"] },
    { label: "Color or finish", type: "text" },
    { label: "Cabinet type", type: "select", options: ["Upper", "Lower", "Both"] },
    { label: "Includes hardware and handles", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Replace countertop": [
    { label: "Countertop material", type: "select", options: ["Granite", "Marble", "Quartz", "Stainless steel", "Laminate", "Other"] },
    { label: "Length (inches)", type: "number" },
    { label: "Width (inches)", type: "number" },
    { label: "Includes sink", type: "select", options: ["Yes", "No"] },
    { label: "Includes removal of old countertop", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install or repair kitchen tiles": [
    { label: "Square footage", type: "number" },
    { label: "Work type", type: "select", options: ["New installation", "Repair", "Partial replacement"] },
    { label: "Tile reference", type: "text" },
    { label: "Specific area", type: "select", options: ["Full wall", "Backsplash", "Floor", "Other"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair kitchen plumbing": [
    { label: "Issue type", type: "select", options: ["Leak", "Broken pipe", "Clog", "Corrosion", "Other"] },
    { label: "Exact location", type: "text" },
    { label: "Pipe material", type: "select", options: ["PVC", "Copper", "Galvanized", "Other"] },
    { label: "Requires opening wall or floor", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install outlet": [
    { label: "Number of outlets", type: "number" },
    { label: "Outlet type", type: "select", options: ["Standard", "GFCI (bathroom/kitchen)", "USB", "220V"] },
    { label: "Location", type: "text" },
    { label: "Requires opening wall", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install light switch": [
    { label: "Number of switches", type: "number" },
    { label: "Switch type", type: "select", options: ["Single", "Double", "Triple", "Dimmer", "Smart"] },
    { label: "Location", type: "text" },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Replace electrical panel": [
    { label: "Current amperage", type: "text" },
    { label: "New amperage", type: "text" },
    { label: "Number of breakers", type: "number" },
    { label: "Panel brand", type: "text" },
    { label: "Requires wiring upgrade", type: "select", options: ["Yes", "No", "Partial"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install light fixture or ceiling fan": [
    { label: "Type", type: "select", options: ["Ceiling light", "Ceiling fan", "Wall sconce", "Floor lamp"] },
    { label: "Quantity", type: "number" },
    { label: "Location", type: "text" },
    { label: "Requires new electrical point", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair short circuit": [
    { label: "Affected area", type: "text" },
    { label: "Symptoms", type: "textarea" },
    { label: "Affected breaker", type: "text" },
    { label: "Identified cause", type: "select", options: ["Overload", "Damaged wiring", "Moisture", "Unknown"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair broken pipe": [
    { label: "Exact location", type: "text" },
    { label: "Pipe material", type: "select", options: ["PVC", "Copper", "Galvanized", "CPVC", "Other"] },
    { label: "Pipe diameter (inches)", type: "text" },
    { label: "Requires opening wall or floor", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install new piping": [
    { label: "Purpose", type: "select", options: ["Cold water", "Hot water", "Drain", "Gas"] },
    { label: "Pipe material", type: "select", options: ["PVC", "Copper", "CPVC", "PEX", "Other"] },
    { label: "Approximate linear feet", type: "number" },
    { label: "Requires opening walls or floor", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair water leak": [
    { label: "Exact location", type: "text" },
    { label: "Leak source", type: "select", options: ["Ceiling", "Wall", "Floor", "Pipe", "Unknown"] },
    { label: "Affected area (sq ft)", type: "number" },
    { label: "Waterproofing material", type: "select", options: ["Membrane", "Liquid waterproofer", "Modified cement", "Other"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Replace shut-off valve": [
    { label: "Location", type: "text" },
    { label: "Valve type", type: "select", options: ["Ball valve", "Gate valve", "Butterfly valve", "Other"] },
    { label: "Diameter (inches)", type: "text" },
    { label: "Quantity", type: "number" },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Unclog drain": [
    { label: "Location", type: "text" },
    { label: "Drain type", type: "select", options: ["Kitchen sink", "Bathroom sink", "Toilet", "Shower", "Main drain", "Other"] },
    { label: "Unclogging method", type: "select", options: ["Mechanical", "Chemical", "Hydrojetting", "To be determined"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install new door": [
    { label: "Door type", type: "select", options: ["Interior", "Exterior", "Sliding", "Folding", "Garage"] },
    { label: "Material", type: "select", options: ["Wood", "Metal", "PVC", "Glass", "Other"] },
    { label: "Dimensions (H x W inches)", type: "text" },
    { label: "Includes frame", type: "select", options: ["Yes", "No"] },
    { label: "Includes lock", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair damaged door": [
    { label: "Door type", type: "select", options: ["Interior", "Exterior", "Sliding", "Garage"] },
    { label: "Damage description", type: "textarea" },
    { label: "Repair type", type: "select", options: ["Hinge adjustment", "Frame repair", "Panel replacement", "Fill damage", "Other"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install new window": [
    { label: "Window type", type: "select", options: ["Sliding", "Casement", "Fixed", "Double-hung", "Awning"] },
    { label: "Frame material", type: "select", options: ["Aluminum", "PVC", "Wood", "Steel"] },
    { label: "Dimensions (H x W inches)", type: "text" },
    { label: "Glass type", type: "select", options: ["Single pane", "Double pane", "Tempered", "Laminated"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair damaged window": [
    { label: "Window type", type: "select", options: ["Sliding", "Casement", "Fixed", "Double-hung"] },
    { label: "Damage description", type: "textarea" },
    { label: "Repair type", type: "select", options: ["Glass replacement", "Frame adjustment", "Lock repair", "Sealing", "Other"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Replace lock": [
    { label: "Lock type", type: "select", options: ["Standard", "Deadbolt", "Electronic", "Biometric", "Smart lock"] },
    { label: "Location", type: "text" },
    { label: "Quantity", type: "number" },
    { label: "Brand or reference", type: "text" },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Paint exterior / facade": [
    { label: "Square footage", type: "number" },
    { label: "Paint color", type: "text" },
    { label: "Paint type", type: "select", options: ["Exterior acrylic", "Elastomeric", "Epoxy", "Other"] },
    { label: "Number of coats", type: "select", options: ["1", "2", "3"] },
    { label: "Includes surface prep", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair exterior roof": [
    { label: "Roof type", type: "select", options: ["Shingle", "Metal", "Concrete", "Membrane", "Tile", "Other"] },
    { label: "Affected area (sq ft)", type: "number" },
    { label: "Damage description", type: "textarea" },
    { label: "Repair material", type: "text" },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Install fence or gate": [
    { label: "Material", type: "select", options: ["Iron", "Aluminum", "Wood", "PVC", "Chain link", "Other"] },
    { label: "Linear feet", type: "number" },
    { label: "Height (inches)", type: "number" },
    { label: "Includes gate", type: "select", options: ["Yes", "No"] },
    { label: "Includes painting", type: "select", options: ["Yes", "No"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Repair driveway or walkway": [
    { label: "Affected area (sq ft)", type: "number" },
    { label: "Surface type", type: "select", options: ["Concrete", "Paver", "Asphalt", "Exterior tile", "Other"] },
    { label: "Repair type", type: "select", options: ["Patch", "Partial replacement", "Full replacement", "Leveling"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
  "Waterproof walls": [
    { label: "Affected area (sq ft)", type: "number" },
    { label: "Location", type: "text" },
    { label: "Waterproofing type", type: "select", options: ["Acrylic liquid", "Membrane", "Modified cement", "Crystalline"] },
    { label: "Number of coats", type: "select", options: ["1", "2", "3"] },
    { label: "Start date", type: "date" },
    { label: "Estimated completion date", type: "date" },
    { label: "Assigned to", type: "text" },
    { label: "Status", type: "select", options: ["Pending", "In progress", "Completed"] },
    { label: "Notes", type: "textarea" },
  ],
};

const categories = {
  "Floors": ["Install new flooring", "Remove existing flooring", "Repair damaged flooring", "Sand and refinish hardwood floor"],
  "Walls": ["Paint walls", "Install wallpaper", "Install wall cladding", "Repair wall crack", "Repair wall hole", "Install drywall"],
  "Ceiling": ["Paint ceiling", "Repair roof leak", "Install drop ceiling", "Repair ceiling crack", "Install recessed lighting"],
  "Bathroom": ["Full bathroom renovation", "Replace toilet", "Replace shower or bathtub", "Replace sink", "Install or repair bathroom tiles", "Repair bathroom plumbing"],
  "Kitchen": ["Full kitchen renovation", "Install cabinets", "Replace countertop", "Install or repair kitchen tiles", "Repair kitchen plumbing"],
  "Electrical": ["Install outlet", "Install light switch", "Replace electrical panel", "Install light fixture or ceiling fan", "Repair short circuit"],
  "Plumbing": ["Repair broken pipe", "Install new piping", "Repair water leak", "Replace shut-off valve", "Unclog drain"],
  "Doors & Windows": ["Install new door", "Repair damaged door", "Install new window", "Repair damaged window", "Replace lock"],
  "Exterior": ["Paint exterior / facade", "Repair exterior roof", "Install fence or gate", "Repair driveway or walkway", "Waterproof walls"],
};

function generateWorkOrderNumber() {
  return String(Math.floor(10000 + Math.random() * 90000));
}

function Formularios() {
  const [workOrderNumber] = useState(generateWorkOrderNumber);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [values, setValues] = useState({});
  const [client, setClient] = useState({ name: "", address: "", phone: "", email: "" });
  const [status, setStatus] = useState(null);

  const currentFields = selectedJob ? jobs[selectedJob] : [];
  const jobsInCategory = selectedCategory ? categories[selectedCategory] : [];

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
    setSelectedJob("");
    setValues({});
  }

  function handleJobChange(e) {
    setSelectedJob(e.target.value);
    setValues({});
  }

  function handleChange(label, value) {
    setValues({ ...values, [label]: value });
  }

  function handleClientChange(field, value) {
    setClient({ ...client, [field]: value });
  }

  async function handleSubmit() {
    setStatus("sending");
    const payload = {
      workOrderNumber,
      date: new Date().toLocaleDateString(),
      clientName: client.name,
      address: client.address,
      phone: client.phone,
      clientEmail: client.email,
      category: selectedCategory,
      jobType: selectedJob,
      fields: values,
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    fontSize: 14,
    borderRadius: 6,
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontFamily: "sans-serif",
  };

  const sectionTitle = {
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#888",
    margin: "20px 0 12px",
    borderBottom: "1px solid #eee",
    paddingBottom: 6,
  };

  if (status === "success") {
    return (
      <div style={{ maxWidth: 560, margin: "40px auto", fontFamily: "sans-serif", padding: "0 16px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h2>Work Order Saved!</h2>
        <p style={{ color: "#555" }}>Work Order <strong>#{workOrderNumber}</strong> has been saved and a notification has been sent to the team.</p>
        <button onClick={() => window.location.reload()} style={{ marginTop: 20, padding: "10px 28px", fontSize: 14, backgroundColor: "#1a1a1a", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
          New Work Order
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 560, margin: "40px auto", fontFamily: "sans-serif", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>Work Order Form</h2>
        <span style={{ background: "#1a1a1a", color: "#fff", padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
          #{workOrderNumber}
        </span>
      </div>

      <div style={sectionTitle}>Client Information</div>

      {[
        { field: "name", label: "Client Name", type: "text" },
        { field: "address", label: "Address", type: "text" },
        { field: "phone", label: "Phone Number", type: "tel" },
        { field: "email", label: "Email", type: "email" },
      ].map(({ field, label, type }) => (
        <div key={field} style={{ marginBottom: 14 }}>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: 500 }}>{label}</label>
          <input type={type} value={client[field]} onChange={(e) => handleClientChange(field, e.target.value)} style={inputStyle} />
        </div>
      ))}

      <div style={sectionTitle}>Work Details</div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Category</label>
        <select value={selectedCategory} onChange={handleCategoryChange} style={inputStyle}>
          <option value="">-- Select a category --</option>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 500 }}>Type of work</label>
          <select value={selectedJob} onChange={handleJobChange} style={inputStyle}>
            <option value="">-- Select the job --</option>
            {jobsInCategory.map((j) => (
              <option key={j} value={j}>{j}</option>
            ))}
          </select>
        </div>
      )}

      {currentFields.map((field) => (
        <div key={field.label} style={{ marginBottom: 14 }}>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: 500 }}>{field.label}</label>
          {field.type === "select" ? (
            <select value={values[field.label] || ""} onChange={(e) => handleChange(field.label, e.target.value)} style={inputStyle}>
              <option value="">-- Select --</option>
              {field.options.map((op) => <option key={op}>{op}</option>)}
            </select>
          ) : field.type === "textarea" ? (
            <textarea value={values[field.label] || ""} onChange={(e) => handleChange(field.label, e.target.value)} style={{ ...inputStyle, height: 80, resize: "vertical" }} />
          ) : (
            <input type={field.type} value={values[field.label] || ""} onChange={(e) => handleChange(field.label, e.target.value)} style={inputStyle} />
          )}
        </div>
      ))}

      {selectedJob && (
        <button onClick={handleSubmit} disabled={status === "sending"} style={{ marginTop: 8, padding: "10px 28px", fontSize: 14, backgroundColor: status === "sending" ? "#888" : "#1a1a1a", color: "#fff", border: "none", borderRadius: 6, cursor: status === "sending" ? "not-allowed" : "pointer" }}>
          {status === "sending" ? "Saving..." : "Save Work Order"}
        </button>
      )}

      {status === "error" && (
        <p style={{ color: "red", marginTop: 12 }}>Error saving. Please try again.</p>
      )}
    </div>
  );
}
