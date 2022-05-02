/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */

import React, { Component } from 'react';
import debounce from 'lodash.debounce';
// import update from 'react-addons-update';
import PlayList from '../tutorial-components/playlist';
import ToolBar from '../tutorial-components/tool-bar';
import TreeList from '../tutorial-components/tree-list';
import * as db from '../../services/firestore';
import SearchSuggestions from '../tutorial-components/search-suggestions';
import { bloomSearch } from '../tutorial-components/search';
import Tree from '../tutorial-components/tree';

const t = {
  root: {
    name: 'a',
    rec: false,
    visible: true,
  },
  left: {
    root: {
      name: 'b',
      rec: false,
      visible: true,
    },
    left: {
      root: {
        name: 'd',
        rec: true,
        visible: true,
      },
      left: null,
      right: null,
    },
    right: {
      root: {
        name: 'e',
        rec: true,
        visible: true,
      },
      left: null,
      right: null,
    },
  },
  right: {
    root: {
      name: 'c',
      rec: false,
      visible: true,
    },
    left: {
      root: {
        name: 'f',
        rec: true,
        visible: true,
      },
      left: null,
      right: null,
    },
    right: {
      root: {
        name: 'g',
        rec: true,
        visible: false,
      },
      left: null,
      right: null,
    },
  },
};

class TutorialPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: [],
      playlist: [],
      searchSuggestions: [],
      searching: false,
      allowRootAdd: true,
      issueRootWarning: false,
      isLoading: false,
      renderDefault: true,
      fillingNodeID: -1,
      tree: t,
    };

    this.search = debounce(this.search, 300);
  }

  componentDidMount() {
    db.fetchTrees()
      .then((result) => this.setState({ trees: result.trees }));
  }

  search = (text) => {
    bloomSearch(text).then((searchSuggestions) => {
      this.setState({
        searchSuggestions,
      });
    });
  };

  rootNode = () => {
    if (this.state.allowRootAdd) {
      this.setState({ searching: true });
    } else {
      this.setState({ issueRootWarning: true });
    }
  };

  handleSelectSong = (song) => {
    this.addNode(song);
    this.setState({ searching: false });
    this.setState((prevState) => ({ currid: prevState.currid + 1 }));
    db.popPlaylist(song);
  };

  // DRAFT FOR LATER USE
  /* handleRunAlgo = () => {
    db.getRecs()
      .then((songIDsList) => { console.log(songIDsList[0]); });
    // db.saveTree();
    const tempSong = {
      name: 'Moonlight', id: '0JP9xo3adEtGSdUEISiszL', album_cover: 'https[]://i.scdn.co/image/ab67616d00001e02806c160566580d6335d1f16c',
    };
    this.setState((prevState) => ({
      layers: [...prevState.layers, [{ song: tempSong }, { song: tempSong }]],
    }));
  }; */

  handleLoadNewTree = (tree) => {
    console.log(tree);
    console.log(tree.target.id);
    db.loadTree(tree.target.id)
      .then((result) => {
        this.setState({ tree: result });
      });
  };

  handleGetRecs = () => {
    this.setState({ isLoading: true });
    db.getRecs()
      .then((songIDs) => {
        // eslint-disable-next-line array-callback-return
        // eslint-disable-next-line no-unused-vars
        db.songIDsToSongs(songIDs.songs)
          .then((res) => {
            this.setState({ playlist: res.songs });
            this.setLoadingFalse();
          });
      });
  };

  setLoadingFalse = () => {
    this.setState({ isLoading: false });
  };

  // eslint-disable-next-line consistent-return
  renderRootWarning() {
    if (this.state.issueRootWarning) {
      return <p>sorry! you can only add one root node</p>;
    }
  }

  render() {
    return (
      <div id="tutorial-page" className="page-container container">
        <TreeList trees={this.state.trees} onSelectDifferentTree={() => this.handleLoadNewTree} />
        <div className="right-half container">
          <ToolBar addRootNode={this.rootNode} />
          {this.renderRootWarning()}
          <SearchSuggestions
            searching={this.state.searching}
            onSelectSong={this.handleSelectSong}
            onSearchChange={this.search}
            searchSuggestions={this.state.searchSuggestions}
          />
          {`Tree: ${this.state.tree}`}
          <Tree currid={this.state.currid} tree={t} runAlgo={this.handleRunAlgo} />
          <PlayList playlist={this.state.playlist} getRecs={this.handleGetRecs} isLoading={this.state.isLoading} />
        </div>
      </div>
    );
  }
}

export default TutorialPage;
