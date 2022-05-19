/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */

// pulls values of or json structure as a list
to_list = (tree, depth) => {
  // SET VALUE YOU WANT
  const value = tree.root.song;
  if (!tree.left || !tree.right) {
    if (!tree.left && !tree.right) {
      return [value];
    } else if (!tree.left) {
      return [value, ...to_list(tree.right, depth += 1)];
    } else {
      return [value, ...to_list(tree.left, depth += 1)];
    }
  }
  return [value, ...to_list(tree.left, depth += 1), ...to_list(tree.right, depth += 1)];
};

find_song = function (search, tree) {
  if (!tree) {
    return null;
  }
  if (tree.root.song === search) {
    return tree.root;
  }
  const res1 = find_song(search, tree.left);
  const res2 = find_song(search, tree.right);
  if (res1) return res1;
  if (res2) return res2;
  return null;
};

set_song = function (new_song, tree, old_song) {
  const oldKey = old_song.song;
  if (!tree) {
    return null;
  } else if (tree.root.song === oldKey) {
    tree.root = new_song;
    return tree;
  } else {
    return { root: tree.root, left: set_song(new_song, tree.left, old_song), right: set_song(new_song, tree.right, old_song) };
  }
};

ui_set = (tree, pid, song) => {
  if (tree) {
    if (tree.root.song.id === pid) {
      tree.left.root.song = song;
    } else {
      ui_set(pid, tree.left);
      ui_set(pid, tree.right);
    }
  }
};

change_attribute = (attr, tree, target) => {
  if (tree === null) {
    return;
  }
  if (tree.root === target) {
    tree.root.attribute = attr;
  }
  change_attribute(attr, tree.left, target);
  change_attribute(attr, tree.right, target);
};

showChildren_fe = (tree, target) => {
  if (tree === null) {
    return;
  }
  if (tree.root.song.id === target) {
    tree.left.root.visible = true;
    tree.right.root.visible = true;
    return;
  }
  showChildren_fe(tree.left, target);
  change_attribute(tree.right, target);
};

// cannot delete root
delete_node = (tree, target) => {
  if (tree) {
    if (tree.left.root === target) {
      tree.left = null;
    } else if (tree.right.root === target) {
      tree.right = null;
    } else {
      delete_node(tree.left, target);
      delete_node(tree.right, target);
    }
  }
};

generateChildren_fe = (tree) => {
  if (tree.root.rec !== 0) return;
  if (!tree.left) {
    tree.left = {
      root: {
        song: null,
        visible: false,
        weight: 4,
        rec: 1,
        attr: null,
      },
      left: null,
      right: null,
    };
  } else generateChildren_fe(tree.left);
  if (tree.right === null) {
    tree.right = {
      root: {
        song: null,
        visible: false,
        weight: 4,
        rec: 2,
        attr: null,
      },
      left: null,
      right: null,
    };
  } else generateChildren_fe(tree.right);
};

const t = {
  root: {
    name: 'a',
    rec: 0,
    visible: true,
    song: {
      name: 'AM Remix', id: '05bfbizlM5AX6Mf1RRyMho', album_cover: 'https://i.scdn.co/image/ab67616d00001e022ae66aa58208495074d88fd0', uri: 'spotify:track:05bfbizlM5AX6Mf1RRyMho',
    },
  },
  left: {
    root: {
      name: 'b',
      rec: 0,
      visible: true,
      song: {
        name: 'A Sky Full of Stars', id: '0FDzzruyVECATHXKHFs9eJ', album_cover: 'https://i.scdn.co/image/ab67616d00001e02f864bcdcc245f06831d17ae0', uri: 'spotify:track:0FDzzruyVECATHXKHFs9eJ',
      },
    },
    left: {
      root: {
        name: 'd',
        rec: 0,
        visible: true,
        song: {
          name: 'Anyone', id: '2WnAKZefdRHxtBEkRjFOHC', album_cover: 'https://i.scdn.co/image/ab67616d00001e02e6f407c7f3a0ec98845e4431', uri: 'spotify:track:2WnAKZefdRHxtBEkRjFOHC',
        },
      },
      left: null,
      right: {
        left: null,
        right: null,
        root: {
          name: null, song: null, attr: null, rec: 2, visibility: false,
        },
      },
    },
    right: {
      root: {
        name: 'e',
        rec: 0,
        visible: true,
        song: {
          name: 'All Girls Are The Same', id: '4VXIryQMWpIdGgYR4TrjT1', album_cover: 'https://i.scdn.co/image/ab67616d00001e02f7db43292a6a99b21b51d5b4', uri: 'spotify:track:4VXIryQMWpIdGgYR4TrjT1',
        },
      },
      left: {
        left: null,
        right: null,
        root: {
          name: null, rec: 1, song: null, attr: null, visibility: false,
        },
      },
      right: {
        left: null,
        right: null,
        root: {
          name: null, song: null, attr: null, rec: 2, visibility: false,
        },
      },
    },
  },
  right: {
    root: {
      name: 'c',
      rec: 0,
      visible: true,
      song: {
        name: 'A Tu Merced', id: '4r9jkMEnArtWGH2rL2FZl0', album_cover: 'https://i.scdn.co/image/ab67616d00001e02548f7ec52da7313de0c5e4a0', uri: 'spotify:track:4r9jkMEnArtWGH2rL2FZl0',
      },
    },
    left: {
      root: {
        name: 'f',
        rec: 0,
        visible: true,
        song: {
          name: 'All Too Well (10 Minute Version) (Taylor"s Version) (From The Vault)', id: '5enxwA8aAbwZbf5qCHORXi', album_cover: 'https://i.scdn.co/image/ab67616d00001e02318443aab3531a0558e79a4d', uri: 'spotify:track:5enxwA8aAbwZbf5qCHORXi',
        },
      },
      left: {
        left: null,
        right: null,
        root: {
          name: null, rec: 1, song: null, attr: null, visibility: false,
        },
      },
      right: {
        left: null,
        right: null,
        root: {
          name: null, song: null, attr: null, rec: 2, visibility: false,
        },
      },
    },
    right: {
      root: {
        name: 'g',
        rec: 0,
        visible: true,
        song: {
          name: 'Armed And Dangerous', id: '5wujBwqG7INdStqGd4tRMX', album_cover: 'https://i.scdn.co/image/ab67616d00001e02f7db43292a6a99b21b51d5b4', uri: 'spotify:track:5wujBwqG7INdStqGd4tRMX',
        },
      },
      left: {
        left: null,
        right: null,
        root: {
          name: null, rec: 1, song: null, attr: null, visibility: false,
        },
      },
      right: null,
    },
  },
  id: 'users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK',
};

t2 = {
  root: {
    name: 'c',
    rec: 0,
    visible: true,
    song: {
      name: 'A Tu Merced', id: '4r9jkMEnArtWGH2rL2FZl0', album_cover: 'https://i.scdn.co/image/ab67616d00001e02548f7ec52da7313de0c5e4a0', uri: 'spotify:track:4r9jkMEnArtWGH2rL2FZl0',
    },
  },
  left: null,
  right: null,
};
generateChildren_fe(t);
console.log('%o', t.left.left.left);
generateChildren_fe(t2);
console.log('%o', t2);
showChildren_fe(t2, '4r9jkMEnArtWGH2rL2FZl0');
console.log('%o', t2);
ui_set(t2, '4r9jkMEnArtWGH2rL2FZl0', {
  name: 'Armed And Dangerous', id: '5wujBwqG7INdStqGd4tRMX', album_cover: 'https://i.scdn.co/image/ab67616d00001e02f7db43292a6a99b21b51d5b4', uri: 'spotify:track:5wujBwqG7INdStqGd4tRMX',
});
console.log('%o', t2);
