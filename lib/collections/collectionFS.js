/**
 * core collectionsFS configurations
 */
FS.HTTP.setBaseUrl("/assets");
FS.HTTP.setHeadersForGet([
  ["Cache-Control", "public, max-age=31536000"]
]);

/**
 * Define CollectionFS collection
 * See: https://github.com/CollectionFS/Meteor-CollectionFS
 * chunkSize: 1024*1024*2; <- CFS default // 256k is default GridFS chunk size, but performs terribly
 */

export const Media = new FS.Collection("Media", {
  stores: [
    new FS.Store.GridFS("image", {
      chunkSize: 1 * 1024 * 1024
    }), new FS.Store.GridFS("large", {
      chunkSize: 1 * 1024 * 1024,
      transformWrite: function (fileObj, readStream, writeStream) {
        if (gm.isAvailable) {
          gm(readStream, fileObj.name).resize("1000", "1000").stream()
            .pipe(writeStream);
        } else {
          readStream.pipe(writeStream);
        }
      }
    }), new FS.Store.GridFS("medium", {
      chunkSize: 1 * 1024 * 1024,
      transformWrite: function (fileObj, readStream, writeStream) {
        if (gm.isAvailable) {
          gm(readStream, fileObj.name).resize("600", "600").stream().pipe(
            writeStream);
        } else {
          readStream.pipe(writeStream);
        }
      }
    }), new FS.Store.GridFS("small", {
      chunkSize: 1 * 1024 * 1024,
      transformWrite: function (fileObj, readStream, writeStream) {
        if (gm.isAvailable) {
          gm(readStream).resize("235", "235" + "^").gravity("Center")
            .extent("235", "235").stream("PNG").pipe(writeStream);
        } else {
          readStream.pipe(writeStream);
        }
      }
    }), new FS.Store.GridFS("thumbnail", {
      chunkSize: 1 * 1024 * 1024,
      transformWrite: function (fileObj, readStream, writeStream) {
        if (gm.isAvailable) {
          gm(readStream).resize("100", "100" + "^").gravity("Center")
            .extent("100", "100").stream("PNG").pipe(writeStream);
        } else {
          readStream.pipe(writeStream);
        }
      }
    })
  ],
  filter: {
    allow: {
      contentTypes: ["image/*"]
    }
  }
});

export const Audio = new FS.Collection("Audio", {
  stores: [
    new FS.Store.GridFS("Audio", {
      transformWrite: function (fileObj, readStream, writeStream) {
        readStream.pipe(writeStream);
      }
    })
  ],
  filter: {
    allow: {
      contentTypes: ["audio/*"]
    }
  }
});


Audio.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});

Audio.deny({
  download: function () {
    return false;
  }
});

export const Video = new FS.Collection("Video", {
  stores: [
    new FS.Store.GridFS("Video", {
      transformWrite: function (fileObj, readStream, writeStream) {
        readStream.pipe(writeStream);
      }
    })
  ],
  filter: {
    allow: {
      contentTypes: ["video/*"]
    }
  }
});


Video.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});

Video.deny({
  download: function () {
    return false;
  }
});


export const Software = new FS.Collection("Software", {
  stores: [
    new FS.Store.GridFS("Software", {
      transformWrite: function (fileObj, readStream, writeStream) {
        readStream.pipe(writeStream);
      }
    })
  ],
  filter: {
    allow: {
      contentTypes: [
        "application/vnd.debian.binary-package",
        "application/x-ms-dos-executable"
      ]
    }
  }
});


Software.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});

Software.deny({
  download: function () {
    return false;
  }
});

export const Books = new FS.Collection("Books", {
  stores: [
    new FS.Store.GridFS("Books", {
      transformWrite: function (fileObj, readStream, writeStream) {
        readStream.pipe(writeStream);
      }
    })
  ],
  filter: {
    allow: {
      contentTypes: ["application/pdf", "application/epub"]
    }
  }
});


Books.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});

Books.deny({
  download: function () {
    return false;
  }
});
