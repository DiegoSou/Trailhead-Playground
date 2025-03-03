<h2>This is the devhub org.</h2>
It has the default folder which contains funcionalities already developed.</h3>
<br><br>
<blockquote>
⚠️ You should create a folder called "manifest-history", just a simple copy of manifest, to track your future generated new packages so they will remain between branch switches.
</blockquote>

<h4>➕ Follow this for a new development</h4>

Create a new branch for your feature:

```
git checkout -b [new_feature_org]
git push -u origin [new_feature_org]
```

Change config/project-scratch-def.json to give a name for your new scratch org:

```
git add .
git commit -m "update: project scratch config"
git push
```

Create new scratch:

```js
sf org create scratch -d -f config/project-scratch-def.json -a [new_feature_org]
```

Before you start the development in scratch, create a folder called "new" to track new files in an separate dir:

```
mkdir force-app/main/new
```

When you finish, create the package containing metadata description and push changes to git:

```js
sf project generate manifest --source-dir force-app/main/new --name [package_feature] --output-dir manifest
sf project generate manifest --source-dir force-app/main/new --name [package_feature] --output-dir manifest-history

git add .
git commit -m "new: feature package created"
git push
```

<h4>☑️ Switch back to devhub. Your package will be safe in manifest-history folder.</h4>

Retrieve source in devHub:

```
git switch devHub
sf project retrieve start -x manifest-history/[package_feature].xml --output-dir [feature_name] --target-org [new_feature_org]
```

Validate:

```
sf project deploy validate -x manifest-history/[package_feature].xml --target-org [dev_hub] -l RunSpecifiedTests -t TestClass1 -t TestClass2
```

<h4>❕ If the validation succeeds</h4>
Pass job ID to "sf project deploy quick" command to deploy the metadata. 
<br>
It will takes less time because it skips running Apex tests.
<br>

```
sf project deploy quick --job-id 0Af0x000017yLUFCA2
```

---

<h4>⚙️ If you need to configure your scratch, these are some utility commands:</h4>

Get password from scratch:

```
sf org generate password --target-org <username-or-alias>
```

Set default devHub:

```
sf config set target-dev-hub=me@myhub.org
```

Add or change org alias:

```
sf alias set my-scratch-org=test-sadbiytjsupn@example.com
```