### pull and fetch differance

### working with repo

```
# see total branch and current working branch
git branch

# create branch
git branch <branch-name>

# switch branch
git switch <branch-name>
git checkout <branch-name>

# create and switch to branch at one time 
git checkout -b my-feature

```

- after that i am moving to feature branch and then doing some changes in files and then do commit
- so here the changes that we have made were not reflected on "main" branch that are only done in "feature" branch
- so **how to look differances between this two branches** so firstly go to main branch then `git diff <featureBranchName>` 
- so if i want to merge this 2 branch then there is easy way of like go to main branch and then run command like `git merge <featureBranchName>` to merge two brach

<br />

- do like professional way by creating PR - Pull Request
- firstly switch to "feature" branch then push the thing 
- that push creates the PR - pull req on github
- now the admin can review it and then can merge it


## git merge conflict
![image-45](https://github.com/parthmern/100xDev-Harkirat/assets/125397720/6e06302c-5fec-4288-ae65-6d3d90fbbcfa)

- it happens when one user do some changes in one branch then push it and at the same time when another user is already working on that same branch do some changes and then try to push code that time conflict arise

- while merging branch that issue of conflict happens
- `git log --merge` shows the conflicts that are available
- open that conflicted file and try to solve it and remove

- ![merge-conflict](https://github.com/parthmern/100xDev-Harkirat/assets/125397720/2e599d7b-086f-43b2-be9a-1a3904ec9489)


- here above img remove `<<<< HEAD` line
- remove `========` line
- remove `>>>>>> BRANCHNAME` line
- to solve conflict issue and then try to push it
- we can also sovle it by vs code feature 
